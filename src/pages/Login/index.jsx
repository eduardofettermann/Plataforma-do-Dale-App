import React from 'react';
import { MainContainer, Content, FormData, InputBox, Input, InputButton, Button } from './style';

export function Login() {
  return (
    <MainContainer>
      <Content>
        <div className="content">
          <h1>Plataforma do Dale</h1>
          <p className="subtitle">A plataforma de talentos</p>
        </div>

        <FormData>
          <InputBox>
            <Input type="login" placeholder='Digite seu login'/>
          </InputBox>

          <InputBox>
            <Input type="Senha" placeholder="Digite sua senha"/>
          </InputBox>
          
          <InputButton>
            <Button>Entrar</Button>
          </InputButton>
        </FormData>
      </Content>
    </MainContainer>
  );
}
