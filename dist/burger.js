class Burger {
	static opened = false

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
			background: transparent;
			font-size: 0;
			background: none;
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
			display: block;
			position: absolute;
			width: 100%;
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
			top: 0;
			background: ${properties.topColor};
		  }
		  ${target}:after {
			bottom: 0;
			background: ${properties.bottomColor};
		  }
		  ${target}.pre-active:before {
			transform: translateY(${animationPadding}px) translateY(-50%);
		  }
		  ${target}.pre-active:after {
			transform: translateY(-${animationPadding}px) translateY(50%);
		  }
		  ${target}.active:before {
			transform: translateY(${animationPadding}px) translateY(-50%) rotateZ(45deg);
		  }
		  ${target}.active:after {
			transform: translateY(-${animationPadding}px) translateY(50%) rotateZ(-45deg);
		  }
		  ${target}.active span {
			transform: translateY(-50%) rotateZ(-45deg);
			opacity: 0;
		  }`
	}

	static getNormalizedProperties(properties) {
		let normalizedProperties = this.standartProperties

		Object.keys(this.standartProperties).forEach(standart => {
			if (properties == null || Object.keys(properties).length == 0)
				return this.standartProperties
			Object.keys(properties).forEach(item => {
				if (standart == item) {
					normalizedProperties[standart] = properties[item]
				}
			})
		})

		return normalizedProperties
	}

	static init(target, properties) {
		document.addEventListener('DOMContentLoaded', () => {
			// нормализуем входные данные
			// normalize input data
			let normalizedProperties = this.getNormalizedProperties(properties)

			// создание стилей
			// create style css
			let style = document.createElement('style')
			style.textContent = this.getTargetStyle(target, normalizedProperties)
			document.body.appendChild(style)

			// формирование бургера
			// create burger
			let burger = document.querySelector('#' + target)
			let span = document.createElement('span')
			span.innerHTML = 'Нажмите чтобы открыть бургер'
			burger.appendChild(span)

			this.target = burger

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

				// пользовательский клик
				// user click
				normalizedProperties.click()
			})
		})
	}
}
