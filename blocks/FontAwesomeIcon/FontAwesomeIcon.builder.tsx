import { FontAwesomeIcon as FontAwesomeComponent } from '@fortawesome/react-fontawesome'
import { Builder } from '@builder.io/react'

function FontAwesomeIcon(props: any) {
  return (
    <FontAwesomeComponent icon={props.iconName} />
  )
}

Builder.registerComponent(FontAwesomeIcon, {
  name: 'FontAwesomeIcon',
  inputs: [{ name: 'iconName', type: 'text' }]
})
