document.addEventListener('DOMContentLoaded', () => {
	// ---------------------------------------------------------
	// ELEMENTOS Y VARIABLES GLOBALES
	// ---------------------------------------------------------
	// UBICACIÓN Y BOTÓN "COMO LLEGAR"
	const comoLlegar = document.getElementById('ubicacion');

	// BOTÓN VOLVER (initBtn)
	const initBtn = document.getElementById('initBtn');
	// BOTON WHATSAPP (wppBtn)
	const wppBtn = document.getElementById('wppBtn');

	// NAV COLECCIONES (vista desktop)
	const colectionsList = document.getElementById('colectionsList');
	const header = document.getElementById('Header');
	const colectionsBtn = document.getElementById('colections');
	const ulList = document.getElementById('ulList');
	const d2 = document.getElementById('d2');

	const cocinasBtn = document.getElementById('cocinasBtn');
	const mesadasBtn = document.getElementById('mesadasBtn');
	const placardsBtn = document.getElementById('placardsBtn');
	const piletasBtn = document.getElementById('piletasBtn');

	const cocinasList = document.getElementById('cocinasList');
	const mesadasList = document.getElementById('mesadasList');
	const placardsList = document.getElementById('placardsList');
	const piletasList = document.getElementById('piletasList');

	// LISTA DE BOTONES Y SUS LISTAS ASOCIADAS (desktop)
	const buttons = [
		{ button: cocinasBtn, list: cocinasList },
		{ button: mesadasBtn, list: mesadasList },
		{ button: placardsBtn, list: placardsList },
		{ button: piletasBtn, list: piletasList },
	];

	// ACCESORIOS Y OBSERVER
	const images = document.querySelectorAll('.accesorio');
	const accesoriosContainer = document.querySelector('#accesoriosContainer');
	const sistemaOpenContainer = document.querySelector('#sistemaOpenContainer');

	// MENÚ HAMBURGUESA (vista mobile)
	const menuBtn = document.getElementById("menuBtn");
	const mobileNavContainer = document.getElementById("mobileNavContainer");
	const menuList = document.getElementById("menuList");

	// ACORDEÓN DE COLECCIONES (vista mobile)
	const mobileColections = document.getElementById('mobileColections');
	const mobileColectionsList = document.getElementById('mobileColectionsList');

	const mobileCocinasBtn = document.getElementById('mobileCocinasBtn');
	const mobilePiletasBtn = document.getElementById('mobilePiletasBtn');
	const mobileMesadasBtn = document.getElementById('mobileMesadasBtn');
	const mobilePlacardsBtn = document.getElementById('mobilePlacardsBtn');

	const mobileCocinasList = document.getElementById('mobileCocinasList');
	const mobilePiletasList = document.getElementById('mobilePiletasList');
	const mobileMesadasList = document.getElementById('mobileMesadasList');
	const mobilePlacardsList = document.getElementById('mobilePlacardsList');

	const verColecciones = document.getElementById('verColecciones');
	const verColecciones2 = document.getElementById('verColecciones2');


	// ---------------------------------------------------------
	// FUNCIONALIDAD: UBICACIÓN Y COMO LLEGAR
	// ---------------------------------------------------------
	function getDirections() {
		const destinoLat = -41.1369417;
		const destinoLng = -71.3119593;

		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userLat = position.coords.latitude;
					const userLng = position.coords.longitude;
					const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinoLat},${destinoLng}&travelmode=driving`;
					window.open(url, "_blank");
				},
				() => {
					alert("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación y vuelve a intentarlo.");
				}
			);
		} else {
			alert("Tu navegador no soporta geolocalización.");
		}
	}

	if (comoLlegar) {
		comoLlegar.addEventListener("click", getDirections, false);
	}


	// ---------------------------------------------------------
	// BOTÓN VOLVER (APARECE AL HACER SCROLL)
	// ---------------------------------------------------------
	let lastScrollTop = 0; // Guardará la última posición de scroll

	window.addEventListener('scroll', () => {
		const currentScroll = window.scrollY;

		// Comprobamos si el usuario está desplazándose hacia arriba
		const scrollingUp = currentScroll < lastScrollTop;

		// Condiciones para mostrar el botón:
		// 1. El usuario debe haber superado los 200px en algún momento
		// 2. Estar haciendo scroll hacia arriba
		if (scrollingUp && currentScroll > 200) {
			initBtn.classList.add('show');
		} else {
			initBtn.classList.remove('show');
		}

		// Actualizamos la posición de scroll
		lastScrollTop = currentScroll;
	});

	// ---------------------------------------------------------
	// BOTÓN WHATSAPP (APARECE AL HACER SCROLL)
	// ---------------------------------------------------------
	if (wppBtn) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 250) {
				wppBtn.classList.add('show');
			} else {
				wppBtn.classList.remove('show');
			}
		});
	}

	// ---------------------------------------------------------
	// NAV COLECCIONES (Vista Desktop)
	// ---------------------------------------------------------

	// Cierra todas las sublistas (desktop)
	const closeAllSubListsDesktop = () => {
		const subLists = d2 ? d2.querySelectorAll('section') : [];
		subLists.forEach((subList) => {
			if (subList.classList.contains('open')) {
				subList.classList.replace('open', 'close');
			}
		});
	};

	// Cierra la lista de colecciones y sublistas (desktop)
	function closeColections(flag) {
		if (!colectionsList || !header || !colectionsBtn || !ulList || !d2) return;

		colectionsBtn.className = '';
		closeAllSubListsDesktop();

		ulList.className = 'fadeOut';
		d2.className = 'close';

		if (flag) {
			setTimeout(() => {
				colectionsList.className = 'fadeOut';
			}, 400);

			setTimeout(() => {
				d2.className = '';
				ulList.className = 'fadeOut';
				colectionsList.className = 'fadeOut';
			}, 450);

			setTimeout(() => {
				header.className = 'shadow Hgrid';
				ulList.className = '';
				colectionsList.className = 'close';
			}, 500);
		} else {
			setTimeout(() => {
				d2.className = '';
				ulList.className = '';
				colectionsList.className = 'close';
				header.className = 'shadow Hgrid';
			}, 450);
		}
	}

	// Abre la lista de colecciones (desktop)
	function openColections() {
		if (!colectionsList || !header || !colectionsBtn) return;
		header.className = 'noHgrid';
		colectionsBtn.className = 'emphasis';
		colectionsList.className = 'open fadeIn shadow';
	}

	// Alternar lista de colecciones (desktop)
	function toggleColections() {
		if (!colectionsList) return;
		if (colectionsList.classList.contains('close')) {
			openColections();
		} else {
			closeColections();
		}
	}

	// Cierra todas las sub-sub-listas (desktop)
	const closeAllListsDesktop = () => {
		buttons.forEach(({ list }) => {
			if (list && list.classList.contains('open')) {
				list.classList.replace('open', 'close');
			}
		});
	};

	// Quita énfasis de todos los botones (desktop)
	const removeEmphasisFromButtons = () => {
		buttons.forEach(({ button }) => {
			if (button) button.classList.remove('emphasis');
		});
	};

	// Añadir eventos a los botones de sub-listas (desktop)
	buttons.forEach(({ button, list }) => {
		if (button && list) {
			button.addEventListener('click', () => {
				// Cerrar todas las sublistas primero
				closeAllListsDesktop();
				removeEmphasisFromButtons();

				// Abrir la sublista si estaba cerrada
				if (list.classList.contains('close')) {
					list.classList.replace('close', 'open');
					button.classList.add('emphasis');
				}
			});
		}
	});

	// Cerrar listas y sublistas al hacer scroll hacia abajo (desktop)
	window.addEventListener('scroll', () => {
		if (colectionsList && colectionsList.classList.contains('open')) {
			closeColections(false);
		}
		closeAllSubListsDesktop();
	});

	// Evento para alternar la lista de colecciones (desktop)
	if (colectionsBtn) {
		colectionsBtn.addEventListener('click', toggleColections);
	}


	// ---------------------------------------------------------
	// ACCESORIOS (IntersectionObserver)
	// ---------------------------------------------------------
	if (images.length > 0) {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					images.forEach((img, index) => {
						setTimeout(() => {
							img.classList.add('showAccesorio');
						}, index * 200);
					});
					obs.unobserve(entry.target);
				}
			});
		}, observerOptions);

		if (accesoriosContainer) {
			observer.observe(accesoriosContainer);
		} else {
			console.log('No se encontró el elemento con id #accesoriosContainer');
		}

		if (sistemaOpenContainer) {
			observer.observe(sistemaOpenContainer);
		} else {
			console.log('No se encontró el elemento con id #sistemaOpenContainer');
		}
	}

	// ---------------------------------------------------------
	// FUNCIONES GLOBALES PARA EL ACORDEÓN EN MÓVIL
	// ---------------------------------------------------------
	// Estas funciones se mueven aquí para poder ser utilizadas en el evento de click del mobileNavContainer.

	function closeAllSubListsMobile() {
		if (mobileCocinasList) mobileCocinasList.classList.remove('open');
		if (mobilePiletasList) mobilePiletasList.classList.remove('open');
		if (mobileMesadasList) mobileMesadasList.classList.remove('open');
		if (mobilePlacardsList) mobilePlacardsList.classList.remove('open');
	}

	function closeAllMobile() {
		if (mobileColectionsList) mobileColectionsList.classList.remove('open');
		closeAllSubListsMobile();
	}

	// ---------------------------------------------------------
	// MENÚ HAMBURGUESA (Vista Mobile)
	// ---------------------------------------------------------
	if (menuBtn && mobileNavContainer && menuList) {
		menuBtn.addEventListener("click", () => {
			menuList.classList.add("animate__animated");

			if (menuBtn.classList.contains("fi-ss-menu-burger")) {
				document.body.classList.add("no-scroll");
				void document.body.offsetWidth; // Forzar reflow

				setTimeout(() => {
					menuBtn.classList.replace("fi-ss-menu-burger", "fi-rs-cross");
					mobileNavContainer.classList.replace("closeNav", "showNav");
					menuList.classList.remove("animate__fadeOutRight");
					menuList.classList.add("animate__fadeInRight");
				}, 100);

			} else {
				menuBtn.classList.replace("fi-rs-cross", "fi-ss-menu-burger");
				menuList.classList.remove("animate__fadeInRight");
				menuList.classList.add("animate__fadeOutRight");

				setTimeout(() => {
					mobileNavContainer.classList.replace("showNav", "closeNav");
					document.body.classList.remove("no-scroll");
				}, 500);
			}
		});

		// Cerrar menú al hacer click fuera (mobile)
		mobileNavContainer.addEventListener("click", e => {
			if (e.target.id === "mobileNavContainer") {
				// Antes de cerrar el nav, cerramos todas las sub-listas
				closeAllMobile();

				menuBtn.classList.replace("fi-rs-cross", "fi-ss-menu-burger");
				document.body.classList.remove("no-scroll");
				menuList.classList.remove("animate__fadeInRight");
				menuList.classList.add("animate__fadeOutRight");

				setTimeout(() => {
					mobileNavContainer.classList.replace("showNav", "closeNav");
				}, 500);
			}
		});
	} else {
		console.log("La web no está en modo mobile o faltan elementos del menú móvil");
	}


	// ---------------------------------------------------------
	// ACORDEÓN DE COLECCIONES (Vista Mobile)
	// ---------------------------------------------------------
	if (mobileColections && mobileColectionsList &&
		mobileCocinasList && mobilePiletasList && mobileMesadasList && mobilePlacardsList) {

		// Al hacer click en COLECCIONES (mobile)
		mobileColections.addEventListener('click', (e) => {
			e.stopPropagation();
			const isOpen = mobileColectionsList.classList.contains('open');
			if (isOpen) {
				closeAllMobile();
			} else {
				mobileColectionsList.classList.add('open');
				closeAllSubListsMobile();
			}
		});

		// Función genérica para togglear sub-secciones (mobile)
		function toggleSubSectionMobile(btn, list) {
			if (btn && list) {
				btn.addEventListener('click', (e) => {
					e.stopPropagation();
					const isOpen = list.classList.contains('open');
					closeAllSubListsMobile();
					if (!isOpen) {
						list.classList.add('open');
					} else {
						list.classList.remove('open');
					}
				});
			}
		}

		toggleSubSectionMobile(mobileCocinasBtn, mobileCocinasList);
		toggleSubSectionMobile(mobilePiletasBtn, mobilePiletasList);
		toggleSubSectionMobile(mobileMesadasBtn, mobileMesadasList);
		toggleSubSectionMobile(mobilePlacardsBtn, mobilePlacardsList);

		// Ver Todo (mobile)
		if (verColecciones) {
			verColecciones.addEventListener('click', () => {
				closeAllMobile();
				window.location.href = "./index.html#colecciones";
			});
		}
		if (verColecciones2) {
			verColecciones2.addEventListener('click', () => {
				closeAllMobile();
				window.location.href = "../index.html#colecciones";
			});
		}
	}

}); // Fin de DOMContentLoaded