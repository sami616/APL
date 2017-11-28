import React from 'react';
import { Loader, Li, CheckBox, Label, Icon } from '../UI';
import tick from '../../assets/tick.svg';
import alert from '../../assets/alert.svg';

const PluginRow = props => {
	const { plugin } = props;
	const { id, label, checked, downloading, downloaded, failed } = props.plugin
	const { triggerDL } = props;

	return (
		<Li key={id}>

			{downloading ? <Loader margin="0 10px 0 0" size={20} col="#a5a2a2" /> : null}
			{failed ? <Icon clickable size={20} margin="0 10px 0 0" src={alert} onClick={() => { triggerDL(plugin) }} /> : null}
			{downloaded ? <Icon size={20} margin="0 10px 0 0" src={tick} /> : null}

			{!downloaded && !failed && !downloading ?
				<CheckBox checked={checked} onClick={() => { triggerDL(plugin) }}></CheckBox> : null}

			<Label checked={checked}>{label}</Label>

		</Li>
	)
}


export default PluginRow;


