import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import TextField from '@atlaskit/field-text'
import ButtonGroup from '@atlaskit/button-group'
import Button from '@atlaskit/button'
import Spinner from '@atlaskit/spinner'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import styled from 'styled-components'
import '@atlaskit/css-reset'
import {
  akGridSizeUnitless,
  akColorB500,
  akColorN800,
  akFontFamily
} from '@atlaskit/util-shared-styles'
import ViewModel from './model'

@observer
class Connect extends Component {
  constructor (props) {
    super(props)
    this.handleJiraUrlChange = this.handleJiraUrlChange.bind(this)
    this.handleConnect = this.handleConnect.bind(this)
    this.handleErrorRetry = this.handleErrorRetry.bind(this)
  }
  render () {
    const {loading, error, jiraUrl, authUrl} = this.props.viewmodel
    const isButtonEnabled = jiraUrl.trim() || authUrl
    return (
      <ConnectPanel>
        <CharlieBanner>
          <img src='charlie.svg' alt='Atlassian logo' />
        </CharlieBanner>
        <ConnectForm>
          <ConnectHeader>Connect to your Atlassian site</ConnectHeader>
          <ConnectParagraph>
            You’re almost ready to upload designs to your team’s Atlassian site.
          </ConnectParagraph>
          <ConnectFields>
            <TextFieldWrapper>
              <TextField
                value={jiraUrl}
                autofocus
                placeholder='sketchfan.atlassian.net'
                label='JIRA cloud site'
                disabled={loading}
                onChange={this.handleJiraUrlChange}
                shouldFitContainer
              />
            </TextFieldWrapper>
            <SpinnerWrapper>
              {loading && (<Spinner size='medium' />)}
            </SpinnerWrapper>
          </ConnectFields>
          <br />
          <ButtonGroup>
            <Button
              appearance='primary'
              type='submit'
              onClick={this.handleConnect}
              isDisabled={!isButtonEnabled}
            >
              Connect
            </Button>
          </ButtonGroup>
        </ConnectForm>
        <BannerWrapper>
          <Banner icon={<ErrorIcon label='Error' />} isOpen={error && true} appearance='error'>
            {error && (error.message || error.name)}
            {this.props.viewmodel.retry && (
              <ClickableSpan onClick={this.handleErrorRetry}>Retry</ClickableSpan>
            )}
          </Banner>
        </BannerWrapper>
      </ConnectPanel>
    )
  }
  handleJiraUrlChange (event) {
    this.props.viewmodel.jiraUrl = event.target.value
  }
  handleConnect () {
    this.props.viewmodel.connect()
  }
  handleErrorRetry () {
    this.props.viewmodel.connect()
  }
}

Connect.propTypes = {
  viewmodel: PropTypes.object.isRequired
}

const ConnectPanel = styled.div`
  font-family: ${akFontFamily};
`
const CharlieBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${akGridSizeUnitless * 9}px;
  background-color: ${akColorB500};
`
const ConnectForm = styled.form`
  padding:
    ${akGridSizeUnitless}px
    ${akGridSizeUnitless * 3}px
    ${akGridSizeUnitless * 3}px
    ${akGridSizeUnitless * 3}px
  ;
`
const ConnectHeader = styled.h3`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.006em;
  color: ${akColorN800};
`
const ConnectParagraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing -0.006em;
  color: ${akColorN800};
`
const ConnectFields = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`
const TextFieldWrapper = styled.div`
  flex-grow: 1;
`
const SpinnerWrapper = styled.div`
  margin-left: ${akGridSizeUnitless}px;
  margin-bottom: 2px;
  width: 30px;
`
const BannerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`
const ClickableSpan = styled.span`
  margin-left: ${akGridSizeUnitless}px;
  text-decoration: underline;
  cursor: pointer;
`

ReactDOM.render(<Connect viewmodel={new ViewModel()} />, document.getElementById('container'))
