import React, { Component } from 'react';
import { connect } from 'react-redux';
import RepoList from '../RepoList';
import * as githubActions from '../../actions/githubActions';
import { DirSelect, Icon, SectionWrap, Msg, Loader, SectionHeader, Select, Button, Input, Ul, Li, CheckBox, Label, TextLabel, MaxWidth } from '../UI';
import alert from '../../assets/alert.svg';

class GitHub extends Component {

	componentDidMount() {
		const { getUserData } = this.props;
		getUserData();
	}

	renderBuilding = () => {
		return (
			<Msg>
				<Loader margin="0 10px 0 0" size={25} col="#a5a2a2" />Building
		</Msg>
		);
	}

	renderBuildErr = () => (
		<Msg><Icon src={alert} clickable size={25} margin="0 10px 0 0" onClick={this.props.build} />{this.props.github.errMsg}</Msg>
	)

	renderNext = () => {
		const { validated } = this.props.github;
		const { build } = this.props;

		if (validated) {
			return <Button onClick={build}>Next</Button>
		} else {
			return <Button disabled>Next</Button>
		}
	}

	render() {

		const { orgSelect, check, checkRepo, selectFolder, setInputVal, keyDown, filter, getUserData } = this.props;
		const { orgs, repos, dataLoaded, repoSelected, dataLoading, dataError, installPath, searchTerm, createRepo, repoName, commitPush, privateRepo, building, buildError } = this.props.github;

		return (

			<SectionWrap>
				<MaxWidth>

					{!building && <SectionHeader>GitHub</SectionHeader>}
					{building && this.renderBuilding()}
					{buildError && this.renderBuildErr()}
					{dataError && <Msg><Icon src={alert} clickable size={25} margin="0 10px 0 0" onClick={getUserData} />Oops something went wrong. Retry?</Msg>}
					{dataLoaded && !building && <RepoList filter={filter} setInputVal={setInputVal} searchTerm={searchTerm} checkRepo={checkRepo} repos={repos} />}
					{dataLoading && <Loader padding="20px" margin="0 auto" size={65} col="#a5a2a2" />}

					{repoSelected && !building &&

						<div>


							<DirSelect disabled small
								margin="20px 0 0 0"
								value={installPath}
								placeholder="Select a directory"
								onClick={selectFolder} />

							<Ul margin="20px 0 0 0">

								<Li>
									<CheckBox id="createRepo" onClick={(e) => { check(e) }} checked={createRepo} />
									<Label>Create a new repo on GitHub</Label>
								</Li>

								{createRepo &&

									<div>

										<Li>
											<TextLabel>Create as:</TextLabel>
											<Select onChange={orgSelect}>
												{orgs.map(org => <option key={org.login} value={org.login}>{org.login}</option>)}
											</Select>
										</Li>

										<Li>
											<TextLabel>Repo name</TextLabel>
											<Input onKeyDown={keyDown} onChange={(e) => { setInputVal(e) }} id="repoName" grey small type="text" placeholder="Repo name" value={repoName} />
										</Li>

										<Li>
											<CheckBox id="commitPush" onClick={(e) => { check(e) }} checked={commitPush} />
											<Label>Create inital commit and push</Label>
										</Li>

										<Li>
											<CheckBox id="privateRepo" onClick={(e) => { check(e) }} checked={privateRepo} />
											<Label>Set repository as private?</Label>
										</Li>


									</div>

								}

							</Ul>

						</div>

					}

					{!dataError && dataLoaded && !building && this.renderNext()}

				</MaxWidth>
			</SectionWrap>

		);

	}

}

const mapStateToProps = state => ({
	github: state.github
})

export default connect(mapStateToProps, { ...githubActions })(GitHub);

