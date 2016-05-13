import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import EnhancedTextarea from 'material-ui/lib/enhanced-textarea'
import TextField from 'material-ui/lib/TextField/TextField'

storiesOf('Enhanced Textarea', module)
  .add('Normal', () => (
    <EnhancedTextarea />
  ))
  .add('Text field', () => (
    <TextField />
  ))
