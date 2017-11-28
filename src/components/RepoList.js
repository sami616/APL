import React from 'react';
import { ScrollView, Flex, Avatar, Msg, Ul, Li, CheckBox, Label, Input } from './UI';
import styled from 'styled-components';

const RepoList = props => {
  const { repos, checkRepo, searchTerm, setInputVal, filter } = props;

  const _handleSearch = e => {
    setInputVal(e)
    filter(e);
  }

  return (
    <div>
      <Msg margin="30px 0 10px  0">Clone a repository?</Msg>

      <Ul>
       <Input onChange={_handleSearch} id="searchTerm" margin="0" value={searchTerm} placeholder="Search" />
        <ScrollView>
          {repos.map(repo => (
            <RepoLi hidden={repo.hidden} key={repo.id}>
              <Flex>
                <CheckBox id={repo.name} onClick={(e) => { checkRepo(e) }} checked={repo.checked} />
                <Label>{repo.name}</Label>
              </Flex>
              <Avatar src={repo.ownerAvatar} size={32} />
            </RepoLi>
          ))}
        </ScrollView>
      </Ul>
    </div>
  );
}

export default RepoList;

const RepoLi = styled(Li) `
  justify-content: space-between;
  display: ${props=>props.hidden ? 'none' : 'flex'};
`