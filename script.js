// ===== 导航栏功能 =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 数字动画效果 =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = start + (end - start) * progress;
        element.textContent = currentValue.toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toFixed(2);
        }
    };
    window.requestAnimationFrame(step);
}

// 观察器：当元素进入视口时触发动画
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targetValue = parseFloat(entry.target.getAttribute('data-target'));
            animateValue(entry.target, 0, targetValue, 2000);
        }
    });
}, observerOptions);

// 观察所有需要动画的数字
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// ===== 数据可视化画布特效 =====
const canvas = document.getElementById('dataVisualization');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 数据点类
    class DataPoint {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#0066ff';
            ctx.fill();
        }
    }

    // 连接线类
    class Connection {
        constructor(point1, point2) {
            this.point1 = point1;
            this.point2 = point2;
            this.distance = Math.sqrt(
                Math.pow(point1.x - point2.x, 2) + 
                Math.pow(point1.y - point2.y, 2)
            );
        }

        draw() {
            if (this.distance < 150) {
                ctx.beginPath();
                ctx.moveTo(this.point1.x, this.point1.y);
                ctx.lineTo(this.point2.x, this.point2.y);
                ctx.strokeStyle = `rgba(0, 102, 255, ${1 - this.distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    // 创建数据点
    const points = [];
    const numPoints = 50;

    for (let i = 0; i < numPoints; i++) {
        points.push(new DataPoint());
    }

    // 创建连接
    const connections = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            connections.push(new Connection(points[i], points[j]));
        }
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新并绘制点
        points.forEach(point => {
            point.update();
            point.draw();
        });

        // 绘制连接线
        connections.forEach(connection => {
            connection.distance = Math.sqrt(
                Math.pow(connection.point1.x - connection.point2.x, 2) + 
                Math.pow(connection.point1.y - connection.point2.y, 2)
            );
            connection.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // 启动动画
    animate();
}

// ===== 图片加载处理 =====
const profileImage = document.getElementById('profile-image');
const imagePlaceholder = document.getElementById('image-placeholder');

if (profileImage) {
    // 图片加载成功
    profileImage.onload = function() {
        this.style.display = 'block';
        this.style.opacity = '1';
        this.classList.add('loaded');
        if (imagePlaceholder) {
            imagePlaceholder.classList.add('hidden');
        }
    };

    // 图片加载失败
    profileImage.onerror = function() {
        this.style.display = 'none';
        if (imagePlaceholder) {
            imagePlaceholder.classList.remove('hidden');
        }
    };

    // 改进的图片加载逻辑，支持多种路径格式
    function loadProfileImage() {
        const imagePath = profileImage.getAttribute('src') || 'images/profile.jpg';
        
        // 如果图片已经有src，先检查是否已加载
        if (profileImage.complete && profileImage.naturalHeight !== 0) {
            profileImage.onload();
            return;
        }
        
        // 创建新的Image对象来预加载
        const img = new Image();
        
        img.onload = function() {
            // 图片加载成功，设置到实际元素
            profileImage.src = imagePath;
            profileImage.style.display = 'block';
            profileImage.style.opacity = '1';
            profileImage.classList.add('loaded');
            if (imagePlaceholder) {
                imagePlaceholder.classList.add('hidden');
            }
        };
        
        img.onerror = function() {
            // 尝试备用路径
            const fallbackPaths = [
                './images/profile.jpg',
                'images/profile.jpg',
                '/images/profile.jpg'
            ];
            
            let currentIndex = 0;
            const tryNextPath = () => {
                if (currentIndex < fallbackPaths.length) {
                    const nextImg = new Image();
                    nextImg.onload = function() {
                        profileImage.src = fallbackPaths[currentIndex];
                        profileImage.style.display = 'block';
                        profileImage.style.opacity = '1';
                        profileImage.classList.add('loaded');
                        if (imagePlaceholder) {
                            imagePlaceholder.classList.add('hidden');
                        }
                    };
                    nextImg.onerror = function() {
                        currentIndex++;
                        tryNextPath();
                    };
                    nextImg.src = fallbackPaths[currentIndex];
                } else {
                    // 所有路径都失败，显示占位符
                    profileImage.style.display = 'none';
                    if (imagePlaceholder) {
                        imagePlaceholder.classList.remove('hidden');
                    }
                }
            };
            
            tryNextPath();
        };
        
        img.src = imagePath;
    }
    
    // 页面加载完成后尝试加载图片
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadProfileImage);
    } else {
        loadProfileImage();
    }
    
    // 也监听窗口加载完成事件（移动端可能需要）
    window.addEventListener('load', loadProfileImage);
}

// ===== 滚动动画 =====
const scrollElements = document.querySelectorAll('.info-card, .skill-category, .interest-item, .timeline-item');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
};

const hideScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

// 初始化元素样式
scrollElements.forEach((el) => {
    hideScrollElement(el);
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// 初始检查
handleScrollAnimation();

// ===== 技能项悬停效果增强 =====
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ===== 页面加载完成后的初始化 =====
window.addEventListener('load', () => {
    // 添加加载完成的类
    document.body.classList.add('loaded');
    
    // 触发初始滚动检查
    handleScrollAnimation();
    
    console.log('个人展示页加载完成！');
});

