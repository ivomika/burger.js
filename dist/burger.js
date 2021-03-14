class Burger {
	static opened = false

	static standartMenuProperties = {
		container: 'body',
		width: 100,
		height: 100,
		background: 'rgba(0,0,0, 0.2)',
		transition: 200,
		zIndex: 0,
	}

	static standartProperties = {
		height: 25,
		width: 40,
		lineHeight: 4,
		lineBorderRadius: 5,
		topColor: '#333',
		centerColor: '#333',
		bottomColor: '#333',
		transition: 200,
		zIndex: 0,
		padding: 0,
		background: 'none',
		borderRadius: 15,
		menu: this.standartMenuProperties,
		click: function () {},
	}

	// css style
	static getTargetStyle(target, properties = this.standartProperties) {
		target = '#' + target
		const animationPadding = properties.height / 2
		return `${target} {
			box-sizing: border-box;
			position: relative;
			height: ${properties.height}px;
			width: ${properties.width}px;
			border-radius: ${properties.borderRadius}px;
			background: transparent;
			font-size: 0;
			background: ${properties.background};
			border: none;
			outline: none;
			padding: 0;
			z-index: ${properties.zIndex};
			transition: transform ${properties.transition}ms ease-in-out;
		  }
		  ${target}:before, ${target}:after {
			content: "";
		  }
		  ${target} span, ${target}:before, ${target}:after {
			box-sizing: border-box;
			display: block;
			position: absolute;
			width: 100%;
			max-width: calc(100% - ${properties.padding * 2}px);
			left: ${properties.padding}px;
			height: ${properties.lineHeight}px;
			border-radius: ${properties.lineBorderRadius}px;
			background: #333;
			transition: transform ${properties.transition}ms ease-in-out;
		  }
		  ${target} span {
			top: 50%;
			transform: translateY(-50%);
			background: ${properties.centerColor};
			transition: transform ${properties.transition}ms ease-in-out
				opacity ${properties.transition}ms ease-in-out;
		  }
		  ${target}:before {
			top: ${properties.padding}px;
			background: ${properties.topColor};
		  }
		  ${target}:after {
			bottom: ${properties.padding}px;
			background: ${properties.bottomColor};
		  }
		  ${target}.pre-active:before {
			transform: translateY(calc(${animationPadding}px - ${
			properties.padding
		}px)) translateY(-50%);
		  }
		  ${target}.pre-active:after {
			transform: translateY(calc(-${animationPadding}px + ${
			properties.padding
		}px)) translateY(50%);
		  }
		  ${target}.active:before {
			transform: translateY(calc(${animationPadding}px - ${
			properties.padding
		}px)) translateY(-50%) rotateZ(45deg);
		  }
		  ${target}.active:after {
			transform: translateY(calc(-${animationPadding}px + ${
			properties.padding
		}px)) translateY(50%) rotateZ(-45deg);
		  }
		  ${target}.active span {
			transform: translateY(-50%) rotateZ(-45deg);
			opacity: 0;
		  }
		  .burger-menu {
			width: ${properties.menu.width}vw;
			height: ${properties.menu.height}vh;
			position: relative;
			transform: translateY(-120%);
			left: calc((100% - ${properties.menu.width}vw) / 2);
			top: 0;
			z-index: ${properties.menu.zIndex};
			transition: transform ${properties.menu.transition}ms linear;
			background: ${properties.menu.background};
			font-size: 1rem;
			-webkit-transform: translateY(-120%);
			-moz-transform: translateY(-120%);
			-ms-transform: translateY(-120%);
			-o-transform: translateY(-120%);
			-webkit-transition: transform ${properties.menu.transition}ms linear;
			-moz-transition: transform ${properties.menu.transition}ms linear;
			-ms-transition: transform ${properties.menu.transition}ms linear;
			-o-transition: transform ${properties.menu.transition}ms linear;
		  }
		  .burger-menu.active {
			transform: translateY(0);
			-webkit-transform: translateY(0);
			-moz-transform: translateY(0);
			-ms-transform: translateY(0);
			-o-transform: translateY(0);
		  }
		  .burger-menu .burger-menu__list {
			position: relative;
			align-items: center;
			list-style: none;
			display: flex;
			flex-direction: column;
			margin: 0;
			padding: 0;
		  }
		  .burger-menu .burger-menu__link {
			position: relative;
			margin-top: 2rem;
			color: #333;
			font-size: 2rem;
			font-weight: 700;
		  }
		  .burger-menu .burger-menu__link a {
			text-decoration: none;
			color: inherit;
		  }`
	}

	static getNormalizedProperties(properties) {
		let normalizedProperties = this.standartProperties
		console.log(this.standartProperties)

		Object.keys(this.standartProperties).forEach(standart => {
			if (properties == null || Object.keys(properties).length == 0)
				return this.standartProperties
			Object.keys(properties).forEach(item => {
				if (standart == item) {
					normalizedProperties[standart] = properties[item]
				}
				if (standart === 'menu') {
					normalizedProperties[standart] = this.getMenuNormalizedProperties(
						properties[item]
					)
				}
			})
		})

		return normalizedProperties
	}

	static getMenuNormalizedProperties(properties) {
		let normalizedMenuProperties = this.standartMenuProperties

		Object.keys(this.standartMenuProperties).forEach(standart => {
			if (properties == null || Object.keys(properties).length == 0)
				return this.standartMenuProperties
			Object.keys(properties).forEach(item => {
				if (standart == item) {
					normalizedMenuProperties[standart] = properties[item]
				}
			})
		})

		return normalizedMenuProperties
	}

	static init(target, properties) {
		document.addEventListener('DOMContentLoaded', () => {
			// нормализуем входные данные
			// normalize input data
			let normalizedProperties = this.getNormalizedProperties(properties)

			console.log(normalizedProperties)

			// создание стилей
			// create style css
			let style = document.createElement('style')
			style.textContent = this.getTargetStyle(target, normalizedProperties)
			document.body.appendChild(style)

			// формирование бургера
			// create burger
			let burger = document.querySelector('#' + target)
			let span = document.createElement('span')
			// span.innerHTML = 'Нажмите чтобы открыть бургер'
			burger.appendChild(span)

			// this.target = burger
			let menu = null

			// ищем nav ссылки
			const navs = document.querySelectorAll('[data-burger="nav"]')
			if (navs.length != 0) {
				navs.forEach(element => {
					element.remove()
				})

				// creatre menu
				menu = document.createElement('div')
				menu.classList.add('burger-menu')
				const nav = document.createElement('nav')
				nav.classList.add('burger-menu__nav')
				const list = document.createElement('ul')
				list.classList.add('burger-menu__list')
				const links = []
				navs.forEach(element => {
					const li = document.createElement('li')
					li.classList.add('burger-menu__link')
					li.innerHTML = element.outerHTML
					links.push(li)
				})

				links.forEach(li => {
					list.appendChild(li)
				})
				nav.appendChild(list)
				menu.appendChild(nav)
				const container = document.querySelector(
					normalizedProperties.menu.container
				)
				container.appendChild(menu)
			}

			// const menu = document.querySelector('.burger-menu')

			// клик по бургеру
			// burger click
			burger.addEventListener('click', () => {
				if (burger.classList.contains('active')) {
					burger.classList.remove('active')
					setTimeout(() => {
						burger.classList.remove('pre-active')
					}, normalizedProperties.transition - 50)

					this.opened = false
				} else {
					burger.classList.add('pre-active')
					setTimeout(() => {
						burger.classList.add('active')
					}, normalizedProperties.transition - 50)

					this.opened = true
				}

				if (menu != null) menu.classList.toggle('active')

				// пользовательский клик
				// user click
				normalizedProperties.click()
			})
		})
	}
}
