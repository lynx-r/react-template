import { useAuth } from 'hooks';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
import { URLS } from 'config';

const LogInForm = (props: { location?: any }) => {

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {authenticate} = useAuth();

  const {from} = props.location?.state || {from: {pathname: URLS.USERS_PAGE_URL}};

  if (redirectToReferrer) {
    return <Redirect to={from}/>;
  }

  const login = (e: FormEvent) => {
    e.preventDefault();
    authenticate((failed) => {
      setRedirectToReferrer(!failed);
    }, username, password);
  };

  return (
    <Form onSubmit={login}>
      <FormGroup>
        <Label>№ жетона</Label>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <AccountOutlineIcon/>
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="№ жетона" value={username}
                 autoComplete="username"
                 onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label>Пароль</Label>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <KeyVariantIcon/>
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Пароль" value={password}
                 type={showPassword ? 'text' : 'password'}
                 autoComplete="current-password"
                 onChange={(e) => setPassword(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button
              className={`m-0 ${showPassword ? ' active' : ''}`}
              onClick={(e) => setShowPassword(!showPassword)}
              type="button"
            >
              <EyeIcon className="m-0"/>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <Row>
        <Col>
          <Button color="primary" className="float-right">Войти</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LogInForm;
