import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as pluginActions from '../../actions/pluginActions';
import { SectionWrap, SectionHeader, Button, Ul, MaxWidth, SlideIn } from '../UI';
import PluginRow from './PluginRow';

class Plugin extends Component {

	renderRow = plugin => {
		const { triggerDL } = this.props;
		return <PluginRow key={plugin.id} plugin={plugin} triggerDL={triggerDL} />
	}

	renderNext = () => {
		const { downloading } = this.props.plugin;
		const { nextSection } = this.props;

		if (!downloading) {
			return <Button onClick={nextSection}>Next</Button>
		} else {
			return <Button disabled>Please wait</Button>
		}
	}

	render() {
		const { plugins } = this.props.plugin;

		return (
			<SlideIn>

				<SectionWrap>

					<MaxWidth>

						<SectionHeader>Plugins</SectionHeader>

						<Ul> {plugins.map(plugin => this.renderRow(plugin))} </Ul>

						{this.renderNext()}

					</MaxWidth>

				</SectionWrap>

			</SlideIn>
		)
	}

}

const mapStateToProps = state => ({
	plugin: state.plugin
})

export default connect(mapStateToProps, { ...pluginActions })(Plugin);



