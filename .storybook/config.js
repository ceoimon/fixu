import { configure } from '@kadira/storybook'

function loadStories () {
  require('../storybook/components/enhance-textarea')
}

configure(loadStories, module)
