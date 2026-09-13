import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
	window.gsap = gsap;
	window.ScrollTrigger = ScrollTrigger;
	window.ScrollToPlugin = ScrollToPlugin;
	window.SplitType = SplitType;
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}


let scriptInitialized = false;

function runMainScript() {
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	// Cleanup any existing custom cursor element if present
	const oldWagCursor = document.getElementById('custom-wag-cursor');
	if (oldWagCursor) {
		oldWagCursor.remove();
	}

	// ========== GLOBAL MOBILE DETECTION ==========
	const isMobile = window.innerWidth <= 768;

	const canvas = document.getElementById('image-canvas');
	const context = canvas.getContext('2d');
	const logo = document.getElementById('logo');
	const text1 = document.getElementById('text-1');
	const text2 = document.getElementById('text-2');
	const bigWord = document.querySelector('.big-word');
	const preloader = document.getElementById('preloader');
	const vhsSpoolLeft = document.querySelector('.vhs-spool-left');
	const vhsSpoolRight = document.querySelector('.vhs-spool-right');
	const vhsTapeLeft = document.querySelector('.vhs-tape-left');
	const vhsTapeRight = document.querySelector('.vhs-tape-right');
	const vhsTitle = document.getElementById('vhs-title');
	const scrollProgress = document.getElementById('scroll-progress');
	const scrollNav = document.querySelector('.scroll-nav');
	const scrollNavItems = document.querySelectorAll('.scroll-nav-item');
	const scrollProgressIndicator = document.querySelector('.scroll-progress-indicator');
	const scrollArrows = document.querySelector('.scroll-arrows');
	const navLinks = document.getElementById('nav-links');
	const mobileMenu = document.getElementById('mobile-menu');
	const burgerMenu = document.getElementById('burger-menu');

	// Bind nav-noti-btn click event for website inquiry drawer
	const notiBtns = document.querySelectorAll('.nav-noti-btn, .nav-noti-container');
	notiBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			window.dispatchEvent(new CustomEvent('open-website-inquiry'));
		});
	});

	const frameCount = 192;
	const currentFrame = index => `/sequoia/sequoia_${String(index).padStart(3, '0')}.jpg`;

	const extraAssets = [
		'/images/1k_Dissolve_Noise_Texture.png',
		'/shell32_160.gif'
	];

	const totalAssetCount = frameCount + extraAssets.length;
	let loadedAssets = 0;
	let initialPlayComplete = false;
	let imagesLoaded = false;
	let preloaderStartTime = Date.now();

	// Preload images
	const images = [];

	// Update VHS tape and Windows XP progress bar based on progress
	function updateVHSProgress(progress) {
		const leftScale = 1 - (progress / 100 * 0.6);
		const rightScale = 0.4 + (progress / 100 * 0.6);

		if (vhsSpoolLeft) vhsSpoolLeft.style.transform = `scale(${leftScale})`;
		if (vhsSpoolRight) vhsSpoolRight.style.transform = `scale(${rightScale})`;

		const tapeLeftOffset = 19 + (progress / 100 * 43);
		const tapeRightOffset = 33 + (progress / 100 * 43);

		if (vhsTapeLeft) vhsTapeLeft.style.transform = `rotate(-14deg) translateX(${tapeLeftOffset}px)`;
		if (vhsTapeRight) vhsTapeRight.style.transform = `rotate(-32deg) translateX(${tapeRightOffset}px)`;

		if (vhsTitle) vhsTitle.textContent = `${Math.round(progress)}%`;

		const xpProgressFill = document.getElementById('xp-progress-fill');
		if (xpProgressFill) {
			xpProgressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
		}
	}

	const onAssetLoaded = () => {
		loadedAssets++;
		const progress = Math.min(100, (loadedAssets / totalAssetCount) * 100);
		updateVHSProgress(progress);

		// Render frame 1 immediately as soon as it's ready so canvas is never blank
		if (loadedAssets === 1 || (images[0] && images[0].complete)) {
			updateImage(1);
		}

		if (loadedAssets >= totalAssetCount && !imagesLoaded) {
			imagesLoaded = true;
			if (document.readyState === 'complete') {
				hidePreloader();
			} else {
				window.addEventListener('load', hidePreloader, { once: true });
			}
		}
	};

	// Preload 192 sequoia frames
	for (let i = 1; i <= frameCount; i++) {
		const img = new Image();
		img.onload = onAssetLoaded;
		img.onerror = onAssetLoaded;
		img.src = currentFrame(i);
		images.push(img);
	}

	// Preload extra heavy assets (e.g. 3.1MB Noise Texture)
	extraAssets.forEach(src => {
		const img = new Image();
		img.onload = onAssetLoaded;
		img.onerror = onAssetLoaded;
		img.src = src;
	});

	// Fallback safety timeout (30s for slow connection fallback)
	setTimeout(() => {
		if (!imagesLoaded) {
			imagesLoaded = true;
			hidePreloader();
		}
	}, 30000);

	function hidePreloader() {
		updateImage(1);
		if (preloader) preloader.classList.add('hidden');
		playInitialSequence();
	}

	let currentFrameIndex = 1;

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		if (currentFrameIndex) {
			updateImage(currentFrameIndex);
		}
	}
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	// Render specific frame with full screen cover logic
	function updateImage(index) {
		currentFrameIndex = index;
		const img = images[index - 1];
		if (img) {
			const w = canvas.width;
			const h = canvas.height;
			const imgRatio = (img.width || 1728) / (img.height || 1080);
			const canvasRatio = w / h;
			let nw, nh, nx, ny;

			if (canvasRatio > imgRatio) {
				nw = w;
				nh = w / imgRatio;
				nx = 0;
				ny = (h - nh) / 2;
			} else {
				nw = h * imgRatio;
				nh = h;
				nx = (w - nw) / 2;
				ny = 0;
			}
			context.clearRect(0, 0, w, h);
			context.drawImage(img, nx, ny, nw, nh);
		}
	}

	// Play initial sequence to frame 155 (skip every other frame for 2x speed)
	function playInitialSequence() {
		let frame = 1;
		const interval = setInterval(() => {
			updateImage(frame);
			frame += 2; // Skip every other frame for 2x speed

			if (frame >= 44) {
				updateImage(44); // Make sure we end on exactly frame 44
				clearInterval(interval);
				initialPlayComplete = true;

				// Animate in logo and first text
				gsap.to(logo, {
					opacity: 1,
					duration: 1,
					ease: "power2.out"
				});

				// Set initial state for BIG word (30% larger)
				gsap.set(bigWord, {
					scale: 1.1,
					rotation: -2
				});

				gsap.to(text1, {
					opacity: 1,
					duration: 1.5,
					ease: "power3.out",
					delay: 0.3
				});

				// Fade in UI components
				gsap.to('.ui-component', {
					opacity: 1,
					duration: 1,
					ease: "power2.out",
					delay: 0.5
				});

				// Fade in navigation links
				gsap.to(navLinks, {
					opacity: 1,
					duration: 1,
					ease: "power2.out",
					delay: 0.5
				});

				// Fade in burger menu
				gsap.to(burgerMenu, {
					opacity: 1,
					duration: 1,
					ease: "power2.out",
					delay: 0.5
				});
				// Refresh ScrollTrigger calculations after initial sequence finishes
				setTimeout(() => {
					if (window.ScrollTrigger) ScrollTrigger.refresh();
				}, 500);
			}
		}, 1000 / 30);
	}

	// Logo click - scroll to top
	logo.addEventListener('click', () => {
		gsap.to(window, {
			scrollTo: {
				y: 0
			},
			duration: 1.5,
			ease: "power2.inOut"
		});
	});

	// Navigation link smooth scrolling
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', (e) => {
			const target = link.getAttribute('href');
			if (!target || target === '#' || link.closest('.nav-contact-wrapper') || link.classList.contains('contact-dropdown-btn')) {
				return;
			}
			e.preventDefault();
			gsap.to(window, {
				scrollTo: {
					y: target,
					offsetY: 0
				},
				duration: 1.5,
				ease: "power2.inOut"
			});
		});
	});

	// Mobile navigation link smooth scrolling
	document.querySelectorAll('.mobile-nav-link').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const target = link.getAttribute('href');

			// Close mobile menu
			burgerMenu.classList.remove('active');
			mobileMenu.classList.remove('active');

			gsap.to(window, {
				scrollTo: {
					y: target,
					offsetY: 0
				},
				duration: 1.5,
				ease: "power2.inOut"
			});
		});
	});

	// Burger menu toggle
	burgerMenu.addEventListener('click', () => {
		burgerMenu.classList.toggle('active');
		mobileMenu.classList.toggle('active');
	});

	// Close mobile menu when clicking outside
	mobileMenu.addEventListener('click', (e) => {
		if (e.target === mobileMenu) {
			burgerMenu.classList.remove('active');
			mobileMenu.classList.remove('active');
		}
	});

	// Mobile email copy
	document.querySelector('.mobile-email').addEventListener('click', function () {
		const email = this.dataset.email;
		navigator.clipboard.writeText(email).then(() => {
			const originalText = this.textContent;
			this.textContent = 'COPIED!';
			setTimeout(() => {
				this.textContent = originalText;
			}, 2000);
		});
	});

	// First text section click - scroll to second text section
	text1.addEventListener('click', () => {
		bigWord.classList.add('unhover');

		window.scrollTo({
			top: window.innerHeight * 2.5,
			behavior: 'smooth'
		});
	});

	// Second text section click - scroll to final section
	text2.addEventListener('click', () => {
		window.scrollTo({
			top: window.innerHeight * 5,
			behavior: 'smooth'
		});
	});

	// Detect scroll
	window.addEventListener('scroll', () => {
		const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = Math.round((window.scrollY / windowHeight) * 100);

		// Show/hide scroll navigation and arrows based on scroll position
		if (scrolled >= 5) {
			scrollNav.classList.add('visible');
			scrollArrows.classList.add('moved');

			// Show percentage indicator
			scrollProgressIndicator.innerHTML = scrolled + '%';
			scrollProgressIndicator.classList.add('visible');
		} else {
			scrollNav.classList.remove('visible');
			scrollArrows.classList.remove('moved');
			scrollProgressIndicator.classList.remove('visible');
		}

		// Hide arrows completely after 15%
		if (scrolled >= 15) {
			scrollArrows.classList.add('hidden');
		} else {
			scrollArrows.classList.remove('hidden');
		}

		// Update active nav item based on scroll position
		const sections = ['text-1', 'reel-scroll-section', 'story-section', 'story-panels-wrapper', 'portfolio-section', 'contact'];
		let currentSection = sections[0];

		sections.forEach((sectionId, index) => {
			const section = document.getElementById(sectionId);
			if (section) {
				const rect = section.getBoundingClientRect();
				if (rect.top <= window.innerHeight / 2) {
					currentSection = sectionId;
				}
			}
		});

		scrollNavItems.forEach(item => {
			item.classList.remove('active');
			if (item.dataset.target === currentSection) {
				item.classList.add('active');
			}
		});

		if (window.scrollY > 10) {
			bigWord.classList.add('unhover');
		}
	});

	// Click to scroll to section
	scrollNavItems.forEach(item => {
		item.addEventListener('click', () => {
			const target = document.getElementById(item.dataset.target);
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	});

	// Scroll-based image scrubbing & smooth black gradient fade out at end
	ScrollTrigger.create({
		trigger: "#spacer",
		start: "top top",
		end: "bottom bottom",
		scrub: 0.5,
		onUpdate: (self) => {
			if (imagesLoaded && initialPlayComplete) {
				const progress = self.progress;
				const startFrame = 44;
				const endFrame = 192;
				const frameRange = endFrame - startFrame;
				const targetFrame = Math.round(startFrame + (frameRange * progress));
				updateImage(targetFrame);

				// Smoothly fade video-container into black background after sequoia_192 frame
				const videoContainer = document.getElementById('video-container');
				if (videoContainer) {
					if (progress > 0.82) {
						const fadeProgress = (progress - 0.82) / 0.18;
						videoContainer.style.opacity = Math.max(0, 1 - fadeProgress);
					} else {
						videoContainer.style.opacity = 1;
					}
				}
			}
		}
	});

	// Wait for layout to be ready, then set up scroll animations
	requestAnimationFrame(() => {
		// Calculate how much to move up to keep everything centered
		const text2Height = text2.offsetHeight;
		const moveUpAmount = -(text2Height / 2);

		// Unified text animation timeline
		const textTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#spacer",
				start: "top top",
				end: "75% top",
				scrub: 1.5
			}
		});

		// All animations in one smooth timeline
		textTimeline
			// Phase 1 (0-40%): Both texts move up, text1 scales down, BIG grows slightly
			.to(text1, {
				y: moveUpAmount,
				scale: 0.9,
				duration: 0.4,
				ease: "none"
			}, 0)
			.to(text2, {
				y: moveUpAmount,
				duration: 0.4,
				ease: "none"
			}, 0)
			.to(bigWord, {
				scale: 1.1,
				rotation: -2,
				duration: 0.15,
				ease: "power2.out"
			}, 0)
			// Phase 2 (20-45%): Text2 fades in
			.to(text2, {
				opacity: 1,
				duration: 0.25,
				ease: "none",
				onComplete: () => {
					// Trigger regular word highlight almost immediately after text2 appears
					setTimeout(() => {
						const regularWord = document.querySelector('.regular-word');
						if (regularWord) regularWord.classList.add('highlighted');
					}, 50);
				},
				onReverseComplete: () => {
					const regularWord = document.querySelector('.regular-word');
					if (regularWord) regularWord.classList.remove('highlighted');
				}
			}, 0.2)
			// Phase 3 (55-80%): Both fade out together
			.to([text1, text2], {
				opacity: 0,
				y: "-=50",
				duration: 0.25,
				ease: "none"
			}, 0.55);
	});

	// Initial frame
	updateImage(1);


	// SplitType text animations - DESKTOP ONLY
	if (!isMobile) {
		const fadetxtUpElems = document.querySelectorAll('.fadetxtUp');
		fadetxtUpElems.forEach((item) => {
			// Safely revert any prior split to prevent nested duplicate .line elements
			if (item.splitTypeInstance) {
				try { item.splitTypeInstance.revert(); } catch { }
			}

			const text = new SplitType(item, {
				types: ['lines', 'words', 'chars']
			});
			item.splitTypeInstance = text;

			if (text.chars && text.chars.length > 0) {
				gsap.fromTo(text.chars,
					{
						opacity: 0,
						y: 24,
						skewY: 2
					},
					{
						opacity: 1,
						y: 0,
						skewY: 0,
						stagger: 0.015,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: item,
							start: "top 85%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}
		});
	} else {
		// On mobile, just show the text immediately
		document.querySelectorAll('.fadetxtUp').forEach(el => {
			el.style.opacity = '1';
		});
	}

	// ========== REAL LIFE WORD CYCLING ==========
	const realLifeWords = ['Weird', 'Cool', 'Complex', 'Ephemeral', 'Silly', 'Beautiful', 'Gross', 'Surprising', 'Awesome'];
	const realLifeWordElement = document.getElementById('real-life-word');
	const realLifeInline = document.querySelector('.real-life-inline');
	const clientSection = document.getElementById('client-section');

	let currentRealLifeIndex = 0;

	// Animate real-life-inline into view - simplified on mobile
	if (realLifeInline) {
		if (!isMobile) {
			gsap.to(realLifeInline, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: realLifeInline,
					start: "top 85%",
					toggleActions: "play none none reverse"
				}
			});
		} else {
			realLifeInline.style.opacity = '1';
			realLifeInline.style.transform = 'translateY(0)';
		}

		// Word cycling - simpler on mobile (just swap text, no animation)
		setInterval(() => {
			if (realLifeWordElement) {
				currentRealLifeIndex = (currentRealLifeIndex + 1) % realLifeWords.length;

				if (!isMobile) {
					// Smooth word transition on desktop
					gsap.to(realLifeWordElement, {
						opacity: 0,
						y: -8,
						duration: 0.15,
						ease: "power2.in",
						onComplete: () => {
							realLifeWordElement.textContent = realLifeWords[currentRealLifeIndex];
							gsap.to(realLifeWordElement, {
								opacity: 1,
								y: 0,
								duration: 0.15,
								ease: "power2.out"
							});
						}
					});
				} else {
					// Simple swap on mobile
					realLifeWordElement.textContent = realLifeWords[currentRealLifeIndex];
				}
			}
		}, 1500);
	}

	// Animate client section fade in - simplified on mobile
	if (clientSection) {
		if (!isMobile) {
			gsap.to(clientSection, {
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: clientSection,
					start: "top 85%",
					toggleActions: "play none none reverse"
				}
			});
		} else {
			clientSection.style.opacity = '1';
			clientSection.style.transform = 'translateY(0)';
		}
	}


	// ========== TARGETED SECTION HEADING SCROLL MOTIONS ==========
	const targetHeadings = [
		{ selector: '#story-section h1', trigger: '#story-section' },
		{ selector: '#awards-section .fadetxtUp', trigger: '#awards-section' },
		{ selector: '#contact-section .contact-title', trigger: '#contact-section' }
	];

	targetHeadings.forEach(item => {
		const elem = document.querySelector(item.selector);
		const triggerElem = document.querySelector(item.trigger) || elem;

		if (elem && triggerElem) {
			gsap.fromTo(elem,
				{
					opacity: 0,
					y: 35,
					skewY: 1.5
				},
				{
					opacity: 1,
					y: 0,
					skewY: 0,
					duration: 1.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: triggerElem,
						start: "top 82%",
						toggleActions: "play none none reverse"
					}
				}
			);
		}
	});

	// ========== STORY SECTION WORD-BY-WORD ANIMATION ==========
	const storyParagraphs = document.querySelectorAll('.story-paragraph');

	if (!isMobile) {
		storyParagraphs.forEach(paragraph => {
			const text = paragraph.textContent;
			const words = text.trim().split(/\s+/);
			paragraph.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

			const storyWords = paragraph.querySelectorAll('.word');
			if (storyWords.length > 0) {
				gsap.fromTo(storyWords,
					{ opacity: 0, y: 15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
						stagger: 0.02,
						scrollTrigger: {
							trigger: paragraph,
							start: "top 85%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}
		});
	} else {
		storyParagraphs.forEach(p => {
			p.style.opacity = '1';
		});
	}

	// Bio image animations - simplified on mobile
	const bioImages = document.querySelectorAll('.bio-image');
	if (!isMobile) {
		bioImages.forEach(img => {
			gsap.to(img, {
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: img,
					start: "top 85%",
					toggleActions: "play none none reverse"
				}
			});
		});
	} else {
		bioImages.forEach(img => {
			img.style.opacity = '1';
			img.style.transform = 'translateY(0)';
		});
	}

	// ========== LOGO SHRINK ON SCROLL ==========
	let lastScrollY = window.scrollY;

	window.addEventListener('scroll', () => {
		const scrollY = window.scrollY;

		// Add scrolled class after scrolling down 100px
		if (scrollY > 100) {
			logo.classList.add('scrolled');
		} else {
			logo.classList.remove('scrolled');
		}

		lastScrollY = scrollY;
	});


	// ========== UI COMPONENTS ==========
	// Email click to copy
	const emailLink = document.querySelector('.email-link');
	const copiedNotification = document.getElementById('copied-notification');

	if (emailLink) {
		emailLink.addEventListener('click', () => {
			const email = emailLink.dataset.email || "inatbalthazar@gmail.com";
			navigator.clipboard.writeText(email).then(() => {
				if (copiedNotification) {
					copiedNotification.classList.add('show');
					setTimeout(() => copiedNotification.classList.remove('show'), 2000);
				}
			});
		});
	}

	// Coordinate hover effects
	const coordBottomRight = document.getElementById('coord-bottom-right');
	const coordBottomLeft = document.getElementById('coord-bottom-left');

	let glitchInterval;

	function startGlitch(element) {
		element.classList.add('glitch');
		glitchInterval = setInterval(() => {
			element.classList.toggle('glitch');
		}, 300);
	}

	function stopGlitch(element) {
		clearInterval(glitchInterval);
		element.classList.remove('glitch');
	}

	coordBottomRight.addEventListener('click', () => {
		const email = coordBottomRight.dataset.email;
		navigator.clipboard.writeText(email).then(() => {
			coordBottomRight.innerHTML = 'COPIED!';
			setTimeout(() => {
				coordBottomRight.innerHTML = `
						<span class="coord-full">Rayong, Thailand • +66 97149 3909</span>
						<span class="coord-short">Rayong, TH</span>
					`;
			}, 2000);
		});
	});

	coordBottomLeft.addEventListener('click', () => {
		const email = coordBottomLeft.dataset.email;
		navigator.clipboard.writeText(email).then(() => {
			coordBottomLeft.innerHTML = 'COPIED!';
			setTimeout(() => {
				coordBottomLeft.innerHTML = `
						<span class="coord-full">inatbalthazar@gmail.com</span>
						<span class="coord-short">EMAIL ME</span>
					`;
			}, 2000);
		});
	});

	// Reel video player - Scroll Expanding Animation
	const reelScrollSection = document.getElementById('reel-scroll-section');
	const reelVideoContainer = document.getElementById('reel-video-container');
	const reelPreview = document.getElementById('reel-preview');
	const reelVideo = document.getElementById('reel-video');
	const reelLabel = document.getElementById('reel-label');
	const reelHeadline = document.getElementById('reel-headline');
	const reelPlayButton = document.getElementById('reel-play-button');
	const reelDarkenOverlay = document.getElementById('reel-darken-overlay');
	const reelControls = document.getElementById('reel-controls');
	const reelPlayPauseBtn = document.getElementById('reel-play-pause-btn');
	const reelPlayIcon = reelPlayPauseBtn.querySelector('.reel-play-icon');
	const reelPauseIcon = reelPlayPauseBtn.querySelector('.reel-pause-icon');
	const reelProgressFill = document.getElementById('reel-progress-fill');
	const reelProgressInput = document.getElementById('reel-progress-input');
	const reelTimeDisplay = document.getElementById('reel-time');
	const reelMuteBtn = document.getElementById('reel-mute-btn');
	const reelVolumeIcon = reelMuteBtn.querySelector('.reel-volume-icon');
	const reelMutedIcon = reelMuteBtn.querySelector('.reel-muted-icon');
	const reelVolumeSlider = document.getElementById('reel-volume-slider');
	const reelFullscreenBtn = document.getElementById('reel-fullscreen-btn');
	const vhsOverlay = document.getElementById('vhs-overlay');
	const vhsBlueScreen = document.querySelector('.vhs-blue-screen');

	let reelIsPlaying = false;
	let vhsGlitchInterval = null;

	// VHS Glitch effect - smooth opacity floating between 5-10%
	function startVHSGlitch() {
		if (vhsGlitchInterval) return;

		function floatOpacity() {
			if (reelIsPlaying || !vhsBlueScreen) return;

			// Random opacity between 0.05 and 0.10
			const targetOpacity = 0.05 + Math.random() * 0.05;

			// Smooth transition duration between 0.8 and 2 seconds
			const duration = 0.8 + Math.random() * 1.2;

			vhsBlueScreen.style.transition = `opacity ${duration}s ease`;
			vhsBlueScreen.style.opacity = targetOpacity;

			// Schedule next float
			vhsGlitchInterval = setTimeout(floatOpacity, duration * 1000);
		}

		floatOpacity();
	}

	function stopVHSGlitch() {
		if (vhsGlitchInterval) {
			clearTimeout(vhsGlitchInterval);
			vhsGlitchInterval = null;
		}
	}

	// Start playing muted preview
	reelPreview.play().catch(() => { });

	// Set initial volume
	reelVideo.volume = 0.8;

	// Animate headline on scroll into view
	gsap.to(reelHeadline, {
		scrollTrigger: {
			trigger: reelScrollSection,
			start: "top 80%",
			end: "top 40%",
			scrub: 1
		},
		opacity: 1,
		y: 0,
		ease: "power2.out"
	});

	// Create scroll-driven expansion & shrink-back timeline
	const reelTl = gsap.timeline({
		scrollTrigger: {
			trigger: reelScrollSection,
			start: "top 60%",
			end: "bottom 10%",
			scrub: 0.4
		}
	});

	// Phase 1: Expand video container
	reelTl.to(reelVideoContainer, {
		width: "80vw",
		height: "80vh",
		borderRadius: "8px",
		ease: "power1.inOut",
		duration: 0.4
	}, 0)
		.to(reelDarkenOverlay, {
			background: "rgba(0, 0, 0, 0.3)",
			ease: "power2.inOut",
			duration: 0.4
		}, 0.1)
		.to(reelLabel, {
			opacity: 0,
			scale: 0.9,
			ease: "power2.out",
			duration: 0.2
		}, 0)
		.to(reelHeadline, {
			opacity: 0,
			y: -30,
			ease: "power2.out",
			duration: 0.3
		}, 0.1)
		.to(reelPlayButton, {
			opacity: 1,
			ease: "expo.out",
			duration: 0.2
		}, 0.3)
		// Phase 2: Shrink video container back down to exact dimensions in screenshot (273.38px x 285.18px)
		.to(reelVideoContainer, {
			width: "273.38px",
			height: "285.18px",
			borderRadius: "12px",
			ease: "power1.inOut",
			duration: 0.4
		}, 0.6)
		.to(reelDarkenOverlay, {
			background: "rgba(0, 0, 0, 0.7)",
			ease: "power2.inOut",
			duration: 0.4
		}, 0.6)
		.to(reelPlayButton, {
			opacity: 0,
			ease: "power2.out",
			duration: 0.2
		}, 0.6);

	// Show play button when expanded
	ScrollTrigger.create({
		trigger: reelScrollSection,
		start: "top top",
		end: "bottom bottom",
		onUpdate: (self) => {
			if (self.progress > 0.4 && !reelIsPlaying) {
				reelPlayButton.classList.add('visible');
				startVHSGlitch();
			} else if (self.progress <= 0.4) {
				reelPlayButton.classList.remove('visible');
				stopVHSGlitch();
				// Reset to preview mode if scrolled back up
				if (reelIsPlaying) {
					stopReelVideo();
				}
			}
		}
	});

	// Format time helper
	function formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	// Start main video
	function startReelVideo() {
		reelIsPlaying = true;
		stopVHSGlitch();
		if (vhsOverlay) vhsOverlay.classList.add('hidden');
		reelPreview.style.display = 'none';
		reelVideo.style.display = 'block';
		reelVideo.currentTime = 0;
		reelVideo.play();
		reelPlayButton.classList.remove('visible');
		reelControls.classList.add('visible');
		reelPlayIcon.style.display = 'none';
		reelPauseIcon.style.display = 'block';
	}

	// Stop main video, return to preview
	function stopReelVideo() {
		reelIsPlaying = false;
		reelVideo.pause();
		reelVideo.currentTime = 0;
		reelVideo.style.display = 'none';
		reelPreview.style.display = 'block';
		reelControls.classList.remove('visible');
		reelPlayIcon.style.display = 'block';
		reelPauseIcon.style.display = 'none';
		if (vhsOverlay) vhsOverlay.classList.remove('hidden');
		startVHSGlitch();
	}

	// Click play button to start main video
	reelPlayButton.addEventListener('click', (e) => {
		e.stopPropagation();
		startReelVideo();
	});

	// Click anywhere on video container to play or scroll-then-play
	reelVideoContainer.addEventListener('click', (e) => {
		if (e.target.closest('#reel-controls')) return;
		if (e.target.closest('#reel-play-button')) return;
		if (reelIsPlaying) return;

		const rect = reelScrollSection.getBoundingClientRect();
		const sectionHeight = reelScrollSection.offsetHeight;
		const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));

		if (scrollProgress > 0.4) {
			startReelVideo();
		} else {
			const targetScroll = reelScrollSection.offsetTop + (sectionHeight * 0.5);
			gsap.to(window, {
				scrollTo: {
					y: targetScroll
				},
				duration: 0.8,
				ease: "power2.inOut",
				onComplete: () => {
					setTimeout(() => {
						startReelVideo();
					}, 200);
				}
			});
		}
	});

	// Play/Pause button
	reelPlayPauseBtn.addEventListener('click', () => {
		if (reelVideo.paused) {
			reelVideo.play();
			reelPlayIcon.style.display = 'none';
			reelPauseIcon.style.display = 'block';
		} else {
			reelVideo.pause();
			reelPlayIcon.style.display = 'block';
			reelPauseIcon.style.display = 'none';
		}
	});

	// Progress bar update
	reelVideo.addEventListener('timeupdate', () => {
		const progress = (reelVideo.currentTime / reelVideo.duration) * 100;
		reelProgressFill.style.width = progress + '%';
		reelProgressInput.value = progress;
		reelTimeDisplay.textContent = `${formatTime(reelVideo.currentTime)} / ${formatTime(reelVideo.duration || 0)}`;
	});

	// Seek
	reelProgressInput.addEventListener('input', () => {
		const seekTime = (reelProgressInput.value / 100) * reelVideo.duration;
		reelVideo.currentTime = seekTime;
	});

	// Mute toggle
	reelMuteBtn.addEventListener('click', () => {
		reelVideo.muted = !reelVideo.muted;
		if (reelVideo.muted) {
			reelVolumeIcon.style.display = 'none';
			reelMutedIcon.style.display = 'block';
		} else {
			reelVolumeIcon.style.display = 'block';
			reelMutedIcon.style.display = 'none';
		}
	});

	// Volume slider
	reelVolumeSlider.addEventListener('input', () => {
		reelVideo.volume = reelVolumeSlider.value / 100;
		if (reelVideo.volume === 0) {
			reelVideo.muted = true;
			reelVolumeIcon.style.display = 'none';
			reelMutedIcon.style.display = 'block';
		} else {
			reelVideo.muted = false;
			reelVolumeIcon.style.display = 'block';
			reelMutedIcon.style.display = 'none';
		}
	});

	// Fullscreen
	reelFullscreenBtn.addEventListener('click', () => {
		if (reelVideo.requestFullscreen) {
			reelVideo.requestFullscreen();
		} else if (reelVideo.webkitRequestFullscreen) {
			reelVideo.webkitRequestFullscreen();
		} else if (reelVideo.webkitEnterFullscreen) {
			reelVideo.webkitEnterFullscreen();
		} else if (reelVideo.msRequestFullscreen) {
			reelVideo.msRequestFullscreen();
		}
	});

	// Video ended - return to preview
	reelVideo.addEventListener('ended', () => {
		stopReelVideo();
		// Show play button again if still expanded
		if (document.querySelector('#reel-scroll-section')) {
			const rect = reelScrollSection.getBoundingClientRect();
			if (rect.top < window.innerHeight * 0.6) {
				reelPlayButton.classList.add('visible');
			}
		}
	});

	// ========== CUSTOM CURSOR ==========
	function initCustomCursor() {
		const cursor = document.createElement('div');
		cursor.classList.add('cursor');
		const cursorFollower = document.createElement('div');
		cursorFollower.classList.add('cursor-follower');

		document.body.appendChild(cursor);
		document.body.appendChild(cursorFollower);

		let mouseX = 0;
		let mouseY = 0;
		let cursorX = 0;
		let cursorY = 0;
		let followerX = 0;
		let followerY = 0;

		// Mouse movement - update target position
		document.addEventListener('mousemove', (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		// Animate cursor with smooth follow
		function animateCursor() {
			// Cursor follows mouse immediately
			cursorX += (mouseX - cursorX) * 0.5;
			cursorY += (mouseY - cursorY) * 0.5;

			// Follower lags behind
			followerX += (mouseX - followerX) * 0.15;
			followerY += (mouseY - followerY) * 0.15;

			cursor.style.left = cursorX + 'px';
			cursor.style.top = cursorY + 'px';
			cursorFollower.style.left = followerX + 'px';
			cursorFollower.style.top = followerY + 'px';

			requestAnimationFrame(animateCursor);
		}

		animateCursor();
	}
	// Add hover detection for interactive elements
	document.addEventListener('mouseover', (e) => {
		const hoverable = e.target.closest('a, button, .ui-component:not(#coord-bottom-left):not(#coord-bottom-right), .nav-link, .mobile-nav-link, .social-link, .burger-line, #logo, .big-word, #reel-play-button, #reel-controls, .reel-btn, #reel-video-container, .award-item, .text-section');

		if (hoverable) {
			document.body.classList.add('cursor-hover');
		}
	});

	document.addEventListener('mouseout', (e) => {
		const hoverable = e.target.closest('a, button, .ui-component:not(#coord-bottom-left):not(#coord-bottom-right), .nav-link, .mobile-nav-link, .social-link, .burger-line, #logo, .big-word, #reel-play-button, #reel-controls, .reel-btn, #reel-video-container, .award-item, .text-section');

		if (hoverable) {
			document.body.classList.remove('cursor-hover');
		}
	});

	// Initialize cursor on desktop only
	if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
		initCustomCursor();
	}

	// ========== CODROPS-STYLE PORTFOLIO STORY ANIMATIONS ==========

	// Hero section animation
	const storyHero = document.querySelector('.story-hero');
	const heroWords = document.querySelectorAll('.story-hero-word');
	const heroImage = document.querySelector('.story-hero-image');

	if (storyHero) {
		if (!isMobile) {
			const heroTl = gsap.timeline({
				scrollTrigger: {
					trigger: storyHero,
					start: "top 70%",
					toggleActions: "play none none reverse"
				}
			});

			// Animate hero words
			heroTl.to(heroWords, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power3.out",
				stagger: 0.1
			});

			// Expand hero image
			if (heroImage) {
				heroTl.to(heroImage, {
					width: '280px',
					duration: 1.2,
					ease: "power2.out"
				}, 0.4);
			}
		} else {
			// Mobile: just show everything
			heroWords.forEach(w => {
				w.style.opacity = '1';
				w.style.transform = 'translateY(0)';
			});
			if (heroImage) {
				heroImage.style.width = '200px';
				heroImage.style.opacity = '1';
			}
		}

		// Hero image video hover - only on desktop
		if (heroImage) {
			const heroVideo = heroImage.querySelector('video');
			if (heroVideo && !isMobile) {
				heroImage.addEventListener('mouseenter', () => heroVideo.play().catch(() => { }));
				heroImage.addEventListener('mouseleave', () => {
					heroVideo.pause();
					heroVideo.currentTime = 0;
				});
			}
			heroImage.addEventListener('click', () => openPortfolioPlayer(heroImage));
		}
	}

	// Panel animations
	// Panel animations with directional entry and ultra-smooth parallax
	const storyPanels = document.querySelectorAll('.story-panel');

	storyPanels.forEach((panel, index) => {
		const label = panel.querySelector('.story-panel-label');
		const titleWords = panel.querySelectorAll('.story-panel-title .word');
		const titleVideo = panel.querySelector('.title-video');
		const subtitle = panel.querySelector('.story-panel-subtitle');
		const description = panel.querySelector('.story-panel-description');
		const button = panel.querySelector('.view-more-projects-btn');
		const image = panel.querySelector('.story-panel-image');
		const video = panel.querySelector('.story-panel-image video');
		const content = panel.querySelector('.story-panel-content');
		const isReversed = panel.classList.contains('story-panel-reversed');

		if (!isMobile) {
			// DESKTOP: Direction-aware, ultra-smooth GSAP timeline animations
			const panelTl = gsap.timeline({
				scrollTrigger: {
					trigger: panel,
					start: "top 85%",
					end: "center center",
					toggleActions: "play none none reverse"
				}
			});

			// Animate label with subtle blur reveal
			if (label) {
				panelTl.fromTo(label,
					{ opacity: 0, y: 18, filter: 'blur(4px)' },
					{
						opacity: 1,
						y: 0,
						filter: 'blur(0px)',
						duration: 0.6,
						ease: "power2.out",
						onComplete: () => {
							label.classList.add('highlighted');
						},
						onReverseComplete: () => {
							label.classList.remove('highlighted');
						}
					}, 0
				);
			}

			// Animate title words with progressive stagger & slight skew
			if (titleWords && titleWords.length > 0) {
				panelTl.fromTo(titleWords,
					{ opacity: 0, y: 35, skewY: isReversed ? -2 : 2 },
					{
						opacity: 1,
						y: 0,
						skewY: 0,
						duration: 0.8,
						ease: "power3.out",
						stagger: 0.07
					}, 0.1
				);
			}

			// Animate title video pill expansion
			if (titleVideo) {
				const titleVideoWidth = titleVideo.dataset.width || '140';
				panelTl.fromTo(titleVideo,
					{ width: '0px', opacity: 0 },
					{
						width: titleVideoWidth + 'px',
						opacity: 1,
						duration: 1.1,
						ease: "expo.out"
					}, 0.25
				);

				// Title video hover behavior
				const titleVid = titleVideo.querySelector('video');
				if (titleVid) {
					titleVideo.addEventListener('mouseenter', () => titleVid.play().catch(() => { }));
					titleVideo.addEventListener('mouseleave', () => {
						titleVid.pause();
						titleVid.currentTime = 0;
					});
				}

				// Click to open player
				titleVideo.addEventListener('click', () => openPortfolioPlayer(titleVideo));
			}

			// Animate subtitle
			if (subtitle) {
				panelTl.fromTo(subtitle,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out"
					}, 0.3
				);
			}

			// Animate description
			if (description) {
				panelTl.fromTo(description,
					{ opacity: 0, y: 22 },
					{
						opacity: 1,
						y: 0,
						duration: 0.65,
						ease: "power2.out"
					}, 0.35
				);
			}

			// Animate button
			if (button) {
				panelTl.fromTo(button,
					{ opacity: 0, y: 15, scale: 0.96 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.55,
						ease: "back.out(1.4)"
					}, 0.45
				);
			}

			// Direction-aware image entrance animation
			if (image) {
				panelTl.fromTo(image,
					{
						opacity: 0,
						scale: 0.91,
						x: isReversed ? -60 : 60,
						rotation: isReversed ? -2 : 2
					},
					{
						opacity: 1,
						scale: 1,
						x: 0,
						rotation: 0,
						duration: 1.1,
						ease: "power3.out"
					}, 0.15
				);

				// Smooth Parallax on image
				gsap.to(image, {
					y: -45,
					ease: "none",
					scrollTrigger: {
						trigger: panel,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2
					}
				});
			}

			// Smooth Parallax on text content
			if (content) {
				gsap.to(content, {
					y: -25,
					ease: "none",
					scrollTrigger: {
						trigger: panel,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.8
					}
				});
			}

			// Video hover
			if (video && image) {
				image.addEventListener('mouseenter', () => video.play().catch(() => { }));
				image.addEventListener('mouseleave', () => {
					video.pause();
					video.currentTime = 0;
				});
			}
		} else {
			// MOBILE: Just show everything, no animations
			if (label) {
				label.style.opacity = '1';
				label.style.transform = 'translateY(0)';
				label.classList.add('highlighted');
			}
			titleWords.forEach(w => {
				w.style.opacity = '1';
				w.style.transform = 'translateY(0)';
			});
			if (titleVideo) {
				const titleVideoWidth = titleVideo.dataset.width || '100';
				titleVideo.style.width = titleVideoWidth + 'px';
				titleVideo.addEventListener('click', () => openPortfolioPlayer(titleVideo));
			}
			if (subtitle) {
				subtitle.style.opacity = '1';
				subtitle.style.transform = 'translateY(0)';
			}
			if (description) {
				description.style.opacity = '1';
				description.style.transform = 'translateY(0)';
			}
			if (image) {
				image.style.opacity = '1';
				image.style.transform = 'scale(1) translateX(0)';
			}
		}

		// Click to open player (both mobile and desktop)
		if (image) {
			image.addEventListener('click', () => openPortfolioPlayer(image));
		}
	});

	// Closing section animation
	const storyClosing = document.querySelector('.story-closing');
	if (storyClosing) {
		const closingWords = storyClosing.querySelectorAll('.word');
		const closingSub = storyClosing.querySelector('.story-closing-sub');

		if (!isMobile) {
			const closingTl = gsap.timeline({
				scrollTrigger: {
					trigger: storyClosing,
					start: "top 75%",
					toggleActions: "play none none reverse"
				}
			});

			closingTl.to(closingWords, {
				opacity: 1,
				y: 0,
				duration: 0.7,
				ease: "power3.out",
				stagger: 0.1
			});

			if (closingSub) {
				closingTl.to(closingSub, {
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "power2.out"
				}, 0.4);
			}
		} else {
			closingWords.forEach(w => {
				w.style.opacity = '1';
				w.style.transform = 'translateY(0)';
			});
			if (closingSub) {
				closingSub.style.opacity = '1';
				closingSub.style.transform = 'translateY(0)';
			}
		}
	}

	// ========== PORTFOLIO SECTION ANIMATIONS ==========

	// Typography animation with expanding image
	const typoSection = document.querySelector('.typo-section');
	const typoWords = document.querySelectorAll('.typo-word');
	const typoImageWrapper = document.querySelector('.typo-image-wrapper');
	const typoDescription = document.querySelector('.typo-description');

	if (!isMobile) {
		// Animate typography words on scroll
		typoWords.forEach((word, index) => {
			gsap.to(word, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: typoSection,
					start: "top 70%",
					toggleActions: "play none none reverse"
				},
				delay: index * 0.1
			});
		});

		// Animate expanding image
		if (typoImageWrapper) {
			gsap.to(typoImageWrapper, {
				width: '200px',
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: typoSection,
					start: "top 60%",
					end: "center center",
					scrub: 1
				}
			});
		}
	} else {
		// Mobile: just show everything
		typoWords.forEach(w => {
			w.style.opacity = '1';
			w.style.transform = 'translateY(0)';
		});
		if (typoImageWrapper) {
			typoImageWrapper.style.width = '150px';
		}
	}

	// Animate description
	if (typoDescription) {
		if (!isMobile) {
			gsap.to(typoDescription, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: typoSection,
					start: "top 80%",
					toggleActions: "play none none reverse"
				}
			});
		} else {
			typoDescription.style.opacity = '1';
			typoDescription.style.transform = 'translateY(0)';
		}
	}

	// ========== PORTFOLIO ACCORDION IN STORY PANELS ==========
	const viewMoreBtns = document.querySelectorAll('.view-more-projects-btn');
	let currentOpenAccordion = null;

	viewMoreBtns.forEach(btn => {
		const accordionId = btn.dataset.accordion;
		const accordion = document.getElementById(accordionId);

		if (!accordion) return;

		const items = accordion.querySelectorAll('.portfolio-item');

		if (!isMobile) {
			// Desktop: GSAP animation
			const tl = gsap.timeline({
				paused: true
			});

			tl.to(accordion, {
				height: 'auto',
				duration: 0.6,
				ease: 'power2.out'
			});

			tl.to(items, {
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power2.out'
			}, '-=0.3');

			accordion._accordionTl = tl;

			btn.addEventListener('click', () => {
				if (currentOpenAccordion && currentOpenAccordion !== accordion) {
					currentOpenAccordion._accordionTl.reverse();
					currentOpenAccordion.classList.remove('open');
					const prevBtn = document.querySelector('[data-accordion="' + currentOpenAccordion.id + '"]');
					if (prevBtn) prevBtn.classList.remove('active');
				}

				if (accordion.classList.contains('open')) {
					tl.reverse();
					accordion.classList.remove('open');
					btn.classList.remove('active');
					currentOpenAccordion = null;
				} else {
					tl.play();
					accordion.classList.add('open');
					btn.classList.add('active');
					currentOpenAccordion = accordion;

					setTimeout(() => {
						accordion.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest'
						});
					}, 300);
				}
			});
		} else {
			// Mobile: simple toggle
			btn.addEventListener('click', () => {
				if (currentOpenAccordion && currentOpenAccordion !== accordion) {
					currentOpenAccordion.style.height = '0';
					currentOpenAccordion.classList.remove('open');
					const prevBtn = document.querySelector('[data-accordion="' + currentOpenAccordion.id + '"]');
					if (prevBtn) prevBtn.classList.remove('active');
				}

				if (accordion.classList.contains('open')) {
					accordion.style.height = '0';
					accordion.classList.remove('open');
					btn.classList.remove('active');
					currentOpenAccordion = null;
				} else {
					// Show items immediately
					items.forEach(item => {
						item.style.opacity = '1';
						item.style.transform = 'translateY(0)';
					});
					accordion.style.height = 'auto';
					accordion.classList.add('open');
					btn.classList.add('active');
					currentOpenAccordion = accordion;
				}
			});
		}
	});

	// ========== ORIGINALS GRID ACCORDION ==========
	const originalsContainer = document.getElementById('originals-container');
	if (originalsContainer) {
		const originalItems = originalsContainer.querySelectorAll('.original-item');
		const dataContainer = document.getElementById('originals-data');
		let currentOpenAccordion = null;
		let currentActiveItem = null;

		// Get content from HTML data elements
		function getItemData(index) {
			const dataEl = dataContainer.querySelector(`[data-item="${index}"]`);
			if (!dataEl) return null;

			return {
				type: dataEl.dataset.type,
				embed: dataEl.dataset.embed || '',
				image: dataEl.dataset.image || '',
				title: dataEl.dataset.title || '',
				text: dataEl.innerHTML.trim()
			};
		}

		// Generate media HTML based on type
		function getMediaHTML(data) {
			if (data.type === 'video') {
				return `<video src="${data.embed}" controls playsinline preload="metadata"></video>`;
			} else if (data.type === 'embed') {
				return `<iframe src="${data.embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
			} else {
				return `<img src="${data.image}" alt="${data.title}">`;
			}
		}

		// Scroll to show accordion content
		function scrollToAccordion(accordion) {
			setTimeout(() => {
				const inner = accordion.querySelector('.original-accordion-inner');
				if (inner) {
					inner.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}, 200);
		}

		// Dim other cards when one is active
		function dimOtherCards(activeItem) {
			originalItems.forEach(item => {
				if (item === activeItem) {
					item.style.opacity = '1';
				} else {
					item.style.opacity = '0.4';
				}
			});
		}

		// Reset all cards to full opacity
		function resetCardOpacity() {
			originalItems.forEach(item => {
				item.style.opacity = '1';
			});
		}

		// Animate items on scroll - DESKTOP ONLY
		if (!isMobile) {
			originalItems.forEach((item, index) => {
				gsap.fromTo(item,
					{ opacity: 0, y: 60, scale: 0.95 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: item,
							start: 'top 85%',
							toggleActions: 'play none none reverse'
						},
						delay: (index % 4) * 0.1
					}
				);
			});
		} else {
			originalItems.forEach(item => {
				item.style.opacity = '1';
				item.style.transform = 'translateY(0) scale(1)';
			});
		}

		// Open accordion
		function openAccordion(accordion, item, data) {
			const inner = accordion.querySelector('.original-accordion-inner');
			const mediaContainer = inner.querySelector('.original-accordion-media');
			const title = inner.querySelector('.original-accordion-title');
			const text = inner.querySelector('.original-accordion-text');

			// Set content
			mediaContainer.innerHTML = getMediaHTML(data);
			title.textContent = data.title;
			text.innerHTML = data.text;

			// Add active states
			accordion.classList.add('open');
			item.classList.add('active');

			// Dim other cards
			dimOtherCards(item);

			// Calculate height and animate
			const innerHeight = inner.scrollHeight;

			if (!isMobile && typeof gsap !== 'undefined') {
				gsap.to(accordion, {
					maxHeight: innerHeight + 40,
					duration: 0.5,
					ease: 'power2.out',
					onComplete: () => {
						scrollToAccordion(accordion);
					}
				});
			} else {
				accordion.style.maxHeight = (innerHeight + 40) + 'px';
				scrollToAccordion(accordion);
			}

			currentOpenAccordion = accordion;
			currentActiveItem = item;
		}

		// Close accordion
		function closeAccordion(accordion, item, callback) {
			const inner = accordion.querySelector('.original-accordion-inner');
			const mediaContainer = inner.querySelector('.original-accordion-media');

			// Stop any playing videos
			const iframe = mediaContainer.querySelector('iframe');
			if (iframe) {
				iframe.src = '';
			}

			// Reset card opacity
			resetCardOpacity();

			if (!isMobile && typeof gsap !== 'undefined') {
				gsap.to(accordion, {
					maxHeight: 0,
					duration: 0.4,
					ease: 'power2.inOut',
					onComplete: () => {
						accordion.classList.remove('open');
						if (callback) callback();
					}
				});
			} else {
				accordion.style.maxHeight = '0';
				accordion.classList.remove('open');
				if (callback) callback();
			}

			if (item) item.classList.remove('active');
		}

		// Swap content within same accordion
		function swapContent(accordion, item, data) {
			const inner = accordion.querySelector('.original-accordion-inner');
			const mediaContainer = inner.querySelector('.original-accordion-media');
			const title = inner.querySelector('.original-accordion-title');
			const text = inner.querySelector('.original-accordion-text');

			// Stop current video
			const iframe = mediaContainer.querySelector('iframe');
			if (iframe) {
				iframe.src = '';
			}

			if (currentActiveItem) currentActiveItem.classList.remove('active');

			// Update dimming
			dimOtherCards(item);

			if (!isMobile && typeof gsap !== 'undefined') {
				gsap.to(inner, {
					opacity: 0,
					duration: 0.2,
					ease: 'power2.in',
					onComplete: () => {
						mediaContainer.innerHTML = getMediaHTML(data);
						title.textContent = data.title;
						text.innerHTML = data.text;  // CHANGED from textContent

						item.classList.add('active');
						currentActiveItem = item;

						const newHeight = inner.scrollHeight;
						gsap.to(accordion, {
							maxHeight: newHeight + 40,
							duration: 0.3,
							ease: 'power2.out'
						});

						gsap.to(inner, {
							opacity: 1,
							duration: 0.3,
							ease: 'power2.out'
						});
					}
				});
			} else {
				mediaContainer.innerHTML = getMediaHTML(data);
				title.textContent = data.title;
				text.innerHTML = data.text;  // CHANGED from textContent
				item.classList.add('active');
				currentActiveItem = item;
				accordion.style.maxHeight = (inner.scrollHeight + 40) + 'px';
			}
		}

		// Click handlers for all items
		originalItems.forEach(item => {
			item.addEventListener('click', () => {
				const itemIndex = item.dataset.index;
				const rowNum = item.dataset.row;
				const accordion = originalsContainer.querySelector(`.original-accordion[data-row="${rowNum}"]`);
				const data = getItemData(itemIndex);

				if (!accordion || !data) return;

				// Clicking same item - close it
				if (currentActiveItem === item) {
					closeAccordion(accordion, item);
					currentOpenAccordion = null;
					currentActiveItem = null;
					return;
				}

				// Different row - close old, open new
				if (currentOpenAccordion && currentOpenAccordion !== accordion) {
					closeAccordion(currentOpenAccordion, currentActiveItem, () => {
						openAccordion(accordion, item, data);
					});
					return;
				}

				// Same row, different item - swap content
				if (currentOpenAccordion === accordion && accordion.classList.contains('open')) {
					swapContent(accordion, item, data);
					return;
				}

				// No accordion open - open this one
				openAccordion(accordion, item, data);
			});
		});
	}

	// Portfolio items - video hover and click handlers
	const portfolioItems = document.querySelectorAll('.portfolio-item');
	const isMobileDevice = window.innerWidth <= 768;

	portfolioItems.forEach((item, index) => {
		const video = item.querySelector('.portfolio-item-video');
		// Only enable video hover on desktop
		if (video && !isMobileDevice) {
			item.addEventListener('mouseenter', () => {
				video.play().catch(() => { });
			});

			item.addEventListener('mouseleave', () => {
				video.pause();
				video.currentTime = 0;
			});
		}

		item.addEventListener('click', () => {
			openPortfolioPlayer(item);
		});
	});

	// Story panel images - click to open fullscreen player
	const storyPanelImages = document.querySelectorAll('.story-panel-image');
	storyPanelImages.forEach(img => {
		img.addEventListener('click', () => {
			openPortfolioPlayer(img);
		});
	});

	// Story hero image (after OUR WORK) - click to open fullscreen player
	const storyHeroImage = document.querySelector('.story-hero-image');
	if (storyHeroImage) {
		storyHeroImage.addEventListener('click', () => {
			openPortfolioPlayer(storyHeroImage);
		});
	}

	// Title videos in story panels - click to open fullscreen player
	const titleVideos = document.querySelectorAll('.title-video');
	titleVideos.forEach(vid => {
		vid.addEventListener('click', (e) => {
			e.stopPropagation();
			openPortfolioPlayer(vid);
		});
	});

	// Portfolio fullscreen player functionality
	const portfolioPlayer = document.getElementById('portfolio-player');
	const portfolioPlayerVideo = document.getElementById('portfolio-player-video');
	const portfolioPlayerClose = document.getElementById('portfolio-player-close');
	const portfolioInfoBtn = document.getElementById('portfolio-info-btn');
	const portfolioInfoPanel = document.getElementById('portfolio-info-panel');
	const infoPanelClose = document.getElementById('info-panel-close');
	const playerPlayBtn = document.getElementById('player-play-btn');
	const playIcon = document.getElementById('play-icon');
	const pauseIcon = document.getElementById('pause-icon');
	const volumeSlider = document.getElementById('volume-slider');
	const infoPanelLabel = document.querySelector('.info-panel-label');
	const infoPanelTitle = document.getElementById('info-panel-title');
	const infoPanelMeta = document.getElementById('info-panel-meta');
	const infoPanelDescription = document.getElementById('info-panel-description');

	// Helper function to split text into words with spans
	function splitIntoWords(element, text) {
		const words = text.split(' ');
		element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
		return element.querySelectorAll('.word');
	}

	// Animate info panel words
	function animateInfoPanelIn() {
		const titleWords = infoPanelTitle.querySelectorAll('.word');
		const descWords = infoPanelDescription.querySelectorAll('.word');

		// Reset and animate label
		gsap.fromTo(infoPanelLabel, {
			opacity: 0,
			y: 10
		}, {
			opacity: 1,
			y: 0,
			duration: 0.4,
			ease: "power2.out",
			delay: 0.2
		});

		// Animate title words
		gsap.fromTo(titleWords, {
			opacity: 0,
			y: 20
		}, {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: "power2.out",
			stagger: 0.05,
			delay: 0.3
		});

		// Animate meta
		gsap.fromTo(infoPanelMeta, {
			opacity: 0,
			y: 10
		}, {
			opacity: 1,
			y: 0,
			duration: 0.4,
			ease: "power2.out",
			delay: 0.5
		});

		// Animate description words
		gsap.fromTo(descWords, {
			opacity: 0,
			y: 15
		}, {
			opacity: 1,
			y: 0,
			duration: 0.4,
			ease: "power2.out",
			stagger: 0.02,
			delay: 0.6
		});
	}

	// Reset info panel animations
	function resetInfoPanelAnimations() {
		const titleWords = infoPanelTitle.querySelectorAll('.word');
		const descWords = infoPanelDescription.querySelectorAll('.word');

		gsap.set(infoPanelLabel, {
			opacity: 0,
			y: 10
		});
		gsap.set(titleWords, {
			opacity: 0,
			y: 20
		});
		gsap.set(infoPanelMeta, {
			opacity: 0,
			y: 10
		});
		gsap.set(descWords, {
			opacity: 0,
			y: 15
		});
	}

	function openPortfolioPlayer(item) {
		const videoSrc = item.dataset.video;
		const title = item.dataset.title;
		const subtitle = item.dataset.subtitle;
		const description = item.dataset.description;

		// Update info panel with word splitting
		splitIntoWords(infoPanelTitle, title);
		infoPanelMeta.textContent = subtitle;
		splitIntoWords(infoPanelDescription, description);

		// Reset animations
		resetInfoPanelAnimations();

		// Set video source if available
		if (videoSrc) {
			portfolioPlayerVideo.src = videoSrc;
			portfolioPlayerVideo.load();
		}

		// Show player
		portfolioPlayer.classList.add('active');
		document.body.style.overflow = 'hidden';

		// Auto-play if video exists
		if (videoSrc) {
			portfolioPlayerVideo.play().then(() => {
				playIcon.style.display = 'none';
				pauseIcon.style.display = 'block';
			}).catch(() => { });
		}
	}

	function closePortfolioPlayer() {
		portfolioPlayer.classList.remove('active');
		portfolioInfoPanel.classList.remove('active');
		portfolioPlayerVideo.pause();
		portfolioPlayerVideo.currentTime = 0;
		document.body.style.overflow = '';
		playIcon.style.display = 'block';
		pauseIcon.style.display = 'none';
	}

	// Close button
	portfolioPlayerClose.addEventListener('click', closePortfolioPlayer);

	// Click outside to close
	portfolioPlayer.addEventListener('click', (e) => {
		if (e.target === portfolioPlayer) {
			closePortfolioPlayer();
		}
	});

	// ESC key to close
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && portfolioPlayer.classList.contains('active')) {
			closePortfolioPlayer();
		}
	});

	// Info button toggle with animation
	portfolioInfoBtn.addEventListener('click', () => {
		const isOpening = !portfolioInfoPanel.classList.contains('active');
		portfolioInfoPanel.classList.toggle('active');

		if (isOpening) {
			animateInfoPanelIn();
		}
	});

	// Info panel close
	infoPanelClose.addEventListener('click', () => {
		portfolioInfoPanel.classList.remove('active');
	});

	// Play/Pause button
	playerPlayBtn.addEventListener('click', () => {
		if (portfolioPlayerVideo.paused) {
			portfolioPlayerVideo.play();
			playIcon.style.display = 'none';
			pauseIcon.style.display = 'block';
		} else {
			portfolioPlayerVideo.pause();
			playIcon.style.display = 'block';
			pauseIcon.style.display = 'none';
		}
	});

	// Video ended event
	portfolioPlayerVideo.addEventListener('ended', () => {
		playIcon.style.display = 'block';
		pauseIcon.style.display = 'none';
	});

	// Volume slider
	volumeSlider.addEventListener('input', (e) => {
		portfolioPlayerVideo.volume = e.target.value;
	});

	// Add portfolio items and story elements to cursor hover detection
	document.addEventListener('mouseover', (e) => {
		const portfolioHoverable = e.target.closest('.portfolio-item, .portfolio-player-close, .portfolio-player-info-btn, .player-btn, .info-panel-close, .story-hero-image, .story-panel-image');
		if (portfolioHoverable) {
			document.body.classList.add('cursor-hover');
		}
	});

	document.addEventListener('mouseout', (e) => {
		const portfolioHoverable = e.target.closest('.portfolio-item, .portfolio-player-close, .portfolio-player-info-btn, .player-btn, .info-panel-close, .story-hero-image, .story-panel-image');
		if (portfolioHoverable) {
			document.body.classList.remove('cursor-hover');
		}
	});

	// Animate award cards on scroll - DESKTOP ONLY
	const isMobileAwards = window.innerWidth <= 968;

	if (!isMobileAwards && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		const awardCards = document.querySelectorAll('.award-card');
		awardCards.forEach((card, index) => {
			gsap.fromTo(card,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					},
					delay: (index % 5) * 0.06
				}
			);
		});
	}

	function copyToClipboard(text, element) {
		navigator.clipboard.writeText(text).then(() => {
			element.classList.add('copied');
			const originalText = element.querySelector('span').textContent;
			element.querySelector('span').textContent = 'Copied!';
			setTimeout(() => {
				element.classList.remove('copied');
				element.querySelector('span').textContent = originalText;
			}, 2000);
		});
	}

	const mapEl = document.getElementById('vintage-map');
	if (mapEl && typeof L !== 'undefined') {
		const map = L.map('vintage-map', {
			center: [12.836, 101.328],
			zoom: 11,
			scrollWheelZoom: false
		});

		L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: '&copy; OpenTopoMap'
		}).addTo(map);

		const officeIcon = L.divIcon({
			className: 'office-marker',
			html: '<div class="office-marker-inner"></div>',
			iconSize: [30, 30],
			iconAnchor: [15, 30],
			popupAnchor: [0, -30]
		});

		L.marker([12.836, 101.328], {
			icon: officeIcon
		}).addTo(map)
			.bindPopup('<div class="office-popup"><h4>Watcharine Duangsri</h4><p>Bankhai, Rayong, Thailand</p></div>');
	}

	const tooltip = document.getElementById('adventure-tooltip');
	const charAndy = document.getElementById('adventure-char-andy');
	const speechBubble = document.getElementById('adventure-speech-bubble');
	const speechText = speechBubble ? speechBubble.querySelector('.speech-text') : null;
	const treasureChest = document.getElementById('adventure-treasure');
	const adventureFooter = document.getElementById('adventure-footer');

	if (!charAndy || !adventureFooter) return;

	// ── Andy Fly-Follow-Cursor System ──
	const andyImg = charAndy.querySelector('img');
	let mouseInsideFooter = false;
	let targetX = 30; // % of footer width
	let targetY = 50; // % of footer height
	let currentX = 30;
	let currentY = 50;
	let lastX = 30;
	const lerpSpeed = 0.2; // Fast & tight follow speed for exact cursor alignment
	let animFrameId = null;
	let isFlying = false;

	// Set Andy to fly mode (use walk gif as fly animation)
	function setFlyMode() {
		if (!isFlying && andyImg && andyImg.dataset.walk) {
			andyImg.src = andyImg.dataset.walk;
			charAndy.classList.add('walking');
			isFlying = true;
		}
	}

	// Set Andy to idle mode
	function setIdleMode() {
		if (isFlying && andyImg && andyImg.dataset.still) {
			andyImg.src = andyImg.dataset.still;
			charAndy.classList.remove('walking');
			isFlying = false;
		}
	}

	// Main animation loop - smoothly lerp Andy toward cursor
	function animateAndy() {
		if (mouseInsideFooter) {
			currentX += (targetX - currentX) * lerpSpeed;
			currentY += (targetY - currentY) * lerpSpeed;

			// Clamp within bounds
			currentX = Math.max(2, Math.min(95, currentX));
			currentY = Math.max(2, Math.min(90, currentY));

			// Apply position
			charAndy.style.left = currentX + '%';
			charAndy.style.bottom = 'auto';
			charAndy.style.top = currentY + '%';

			// Flip direction based on horizontal movement
			const dx = currentX - lastX;
			if (Math.abs(dx) > 0.02) {
				if (dx > 0) {
					andyImg.style.transform = 'scaleX(1)'; // Moving right (mirrored)
				} else {
					andyImg.style.transform = 'scaleX(-1)'; // Moving left (mirrored)
				}
			}
			lastX = currentX;

			// Add subtle floating bob
			const bobY = Math.sin(Date.now() * 0.004) * 1.5;
			charAndy.style.marginTop = bobY + 'px';
		}

		animFrameId = requestAnimationFrame(animateAndy);
	}

	// Start animation loop
	animFrameId = requestAnimationFrame(animateAndy);

	// Track mouse movement inside adventure-footer (aligned directly to adventure-scene)
	adventureFooter.addEventListener('mousemove', (e) => {
		const sceneElem = document.querySelector('.adventure-scene') || adventureFooter;
		const rect = sceneElem.getBoundingClientRect();
		targetX = ((e.clientX - rect.left) / rect.width) * 100;
		targetY = ((e.clientY - rect.top) / rect.height) * 100;

		if (!mouseInsideFooter) {
			mouseInsideFooter = true;
			currentX = targetX;
			currentY = targetY;
		}

		setFlyMode();
	});

	// When mouse leaves footer, Andy floats back to ground idle
	adventureFooter.addEventListener('mouseleave', () => {
		mouseInsideFooter = false;
		setIdleMode();

		// Smoothly return to ground idle position
		if (window.gsap) {
			gsap.killTweensOf(charAndy);
			gsap.to(charAndy, {
				top: 'auto',
				bottom: '1%',
				left: currentX + '%',
				marginTop: 0,
				duration: 0.8,
				ease: "power2.out"
			});
		} else {
			charAndy.style.top = 'auto';
			charAndy.style.bottom = '1%';
			charAndy.style.marginTop = '0px';
		}
	});

	// ── Hotspot Interactions (click hotspot → speech bubble) ──
	const hotspots = {
		'adventure-sequoia': { action: "LOOK", response: "That's one big tree! Engineered for stability." },
		'adventure-tent': { action: "LOOK", response: "Basecamp for late-night Full-Stack coding sessions!" },
		'adventure-campfire': { action: "LOOK", response: "Warm campfire & high-efficiency power systems." },
		'adventure-camera': { action: "LOOK", response: "Capturing 4K automotive diagnostic & EV highlights." },
		'adventure-laptop': { action: "LOOK", response: "Full-Stack Development Workstation • React, Node & SQL." },
		'adventure-canteen': { action: "PICK UP", response: "Hydration acquired! Ready for peak performance.", execute: () => { const canteen = document.getElementById('adventure-canteen'); if (canteen) canteen.style.display = 'none'; } },
		'adventure-mud': { action: "LOOK", response: "4x4 Suspension & steering calibration field." },
		'adventure-owl': { action: "LOOK", response: "Hoo-hoo! Night-owl developer hard at work." },
		'adventure-drone': { action: "LOOK", response: "Telemetry drone monitoring system metrics." },
		'adventure-jsd13': { action: "LOOK", response: "JSD13 — Junior Software Developer Cohort 13 (Generation Thailand)!" }
	};

	// Setup hotspot hover and click handlers
	Object.keys(hotspots).forEach(id => {
		const elem = document.getElementById(id);
		if (!elem) return;

		elem.addEventListener('mouseenter', () => {
			const data = hotspots[id];
			if (tooltip) {
				tooltip.textContent = data.action;
				tooltip.style.display = 'block';
				tooltip.classList.add('visible');
			}
		});

		elem.addEventListener('mousemove', (e) => {
			if (tooltip) {
				tooltip.style.left = (e.clientX + 15) + 'px';
				tooltip.style.top = (e.clientY - 25) + 'px';
			}
		});

		elem.addEventListener('mouseleave', () => {
			if (tooltip) {
				tooltip.classList.remove('visible');
				tooltip.style.display = 'none';
			}
		});

		elem.addEventListener('click', (e) => {
			e.stopPropagation();
			const data = hotspots[id];
			showCharacterSpeech(data.response);
			if (data.execute) data.execute();
		});
	});

	// Treasure chest interaction
	if (treasureChest) {
		treasureChest.addEventListener('click', (e) => {
			e.stopPropagation();
			showCharacterSpeech("Treasure unlocked! Opening Watcharine's GitHub Repos...");
			if (window.gsap) {
				gsap.to(treasureChest, {
					scale: 1.25,
					duration: 0.3,
					yoyo: true,
					repeat: 3,
					onComplete: () => {
						window.open('https://github.com/inatbalthazar', '_blank');
					}
				});
			} else {
				window.open('https://github.com/inatbalthazar', '_blank');
			}
		});
	}

	// Speech bubble popup above Andy
	function showCharacterSpeech(text) {
		if (!speechBubble || !speechText) return;

		speechText.textContent = text;
		const rect = charAndy.getBoundingClientRect();
		speechBubble.style.position = 'fixed';
		speechBubble.style.left = (rect.left + rect.width / 2) + 'px';
		speechBubble.style.top = (rect.top - 70) + 'px';
		speechBubble.style.transform = 'translateX(-50%)';
		speechBubble.style.display = 'block';
		speechBubble.style.zIndex = '1000';

		speechBubble.classList.add('visible');
		setTimeout(() => {
			speechBubble.classList.remove('visible');
			setTimeout(() => {
				speechBubble.style.display = 'none';
			}, 300);
		}, 3500);
	}
}

export function initPortfolioScripts() {
	if (typeof window === 'undefined') return;

	if (!scriptInitialized) {
		scriptInitialized = true;
		runMainScript();
	} else if (window.gsap && window.ScrollTrigger) {
		window.ScrollTrigger.refresh();
	}

	setTimeout(() => {
		if (window.gsap && window.ScrollTrigger) {
			window.ScrollTrigger.refresh();
		}
	}, 200);
}
