import $, * as utils from './utils'

const saveConfiguration = (event) => {
  localStorage.setItem(event.currentTarget.id, event.currentTarget.value)
}

const changeConfigurationTitle = (event) => {
  $(`#${event.currentTarget.id}`).title = event.currentTarget.value
}

const load = () => {
  utils.$$('input, select').forEach((input) => {
    const value = localStorage.getItem(input.id)

    if (value) {
      $(`#${input.id}`).value = value
    }

    $(`#${input.id}`).addEventListener('input', saveConfiguration)
    $(`#${input.id}`).addEventListener('input', changeConfigurationTitle)
  })

  $('#highScore').innerHTML = utils.fillHighScore()
}

export default load
