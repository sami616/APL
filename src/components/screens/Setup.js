import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as setupActions from '../../actions/setupActions';
import { DirSelect, Button, SectionWrap, MaxWidth, SlideIn } from '../UI';
import {Transition} from 'react-transition-group';

class Setup extends Component {

  componentDidMount() {
    this.props.setYear();
  }

  render() {

    const { name } = this.props.setup;
    const { name: displayName } = this.props.user;
    const { projectPath } = this.props.setup.paths;
    const { validation } = this.props.setup;
    const { keyDown, onTextChange, selectFolder, createFolders } = this.props;

    return (
      <SlideIn>
        <SectionWrap>
          <MaxWidth>
            <Welcome>
              <p>Konnichiwa {displayName}</p>
              <span>LAUNCH A NEW &lt;PROJECT&#47;&gt; :)</span>
            </Welcome>

            {projectPath ? <Path>{projectPath}</Path> : null}

            <DirSelect
              margin="10px 0 0 0"
              onKeyDown={keyDown}
              onChange={onTextChange}
              value={name}
              placeholder="Folder name"
              onClick={selectFolder}
            />

            {validation ? <Button validation={validation} primary onClick={createFolders}>Next</Button> : null}

          </MaxWidth>
        </SectionWrap>
      </SlideIn>
    );
  }
}

const mapStateToProps = state => ({
  setup: state.setup,
  user: state.user
})

export default connect(mapStateToProps, { ...setupActions })(Setup);

const Welcome = styled.div`
  p {
    font-size: 25px;
    margin: 0;
    color: #585858;
    font-family: RobotoMedium;
  }

  span {
    display: block;
    margin: 10px 0 10px 0;
    text-transform: uppercase;
    color: #b7b7b7;
  }
`

export const Path = styled.p`
  font-size: 14px;
  display: inline-block;
  text-align: left;
  background: #eae8e8;
  padding: 9px;
  box-shadow: 0 0px 1px 1px #d0d0d0;
  color: #a2a2a2;
  margin: 10px 0 0 0;
`

