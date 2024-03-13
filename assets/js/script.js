const encryptKey = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
}

const encrypt = (text, key) => {
  return text
    .split('')
    .map((ele) => key[ele] || ele)
    .join('')
}

const decrypt = (text, key) => {
  return Object.keys(key).reduce((acc, ele) => {
    const regEx = new RegExp(key[ele], 'g')
    return acc.replace(regEx, ele)
  }, text)
}

const getDOMElements = () => {
  return {
    domUserInput: document.getElementById('user-input'),
    domUserOutput: document.getElementById('user-output'),
    domImageBox: document.getElementById('img-box'),
    domTextBox: document.getElementById('msg-box'),
    domBtnCopy: document.getElementById('btn-copy'),
    domBtnEncrypt: document.getElementById('btn-encrypt'),
    domBtnDecrypt: document.getElementById('btn-decrypt'),
  }
}

const manipulateDOM = (output, cl = false) => {
  const { domUserOutput, domBtnCopy, domImageBox, domTextBox } =
    getDOMElements()
  domUserOutput.classList.remove('display-none')
  domBtnCopy.classList.remove('display-none')
  domImageBox.classList.add('display-none')
  domTextBox.classList.add('display-none')
  domUserOutput.value = output

  if (cl) {
    console.log(output)
  }
}

const valideInput = (input) => {
  const regEx = /^[a-z]+$/
  return !regEx.test(input)
}

const processInput = (operation) => {
  const { domUserInput } = getDOMElements()
  const input = domUserInput.value

  if (!input) {
    alert('Debes de ingresar algun texto.')
    return
  }

  if (valideInput(input)) {
    alert('El texto solo debe de contener minusculas y sin acentos.')
    return
  }

  const output = operation.apply(null, [input, encryptKey])
  manipulateDOM(output)
}

const copyOutput = () => {
  const { domUserOutput } = getDOMElements()
  const output = domUserOutput.value

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(output)
    return
  }

  navigator.clipboard
    .writeText(output)
    .then(() => {
      alert('¡Texto copiado al portapapeles!')
    })
    .catch((err) =>
      console.error('Error al copiar el texto al portapapeles: ', err),
    )
}

document.addEventListener('DOMContentLoaded', () => {
  const { domBtnEncrypt, domBtnDecrypt, domBtnCopy } = getDOMElements()

  domBtnEncrypt.addEventListener('click', () => {
    processInput(encrypt)
  })

  domBtnDecrypt.addEventListener('click', () => {
    processInput(decrypt)
  })

  domBtnCopy.addEventListener('click', () => {
    copyOutput()
  })
})
