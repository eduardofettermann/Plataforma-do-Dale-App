import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../routes/use.auth';
import diaDTrampoLogo from '../../assets/images/dia_d_trampo.png';
import {
  MainContainer,
  Content,
  FormData,
  InputBox,
  Input,
  InputButton,
  Button,
} from './style';

export function Login() {
  const { signin, user, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await signin(email, senha);
      if (user) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <MainContainer>
      <Content>
        <div className='content'>
          <img src={diaDTrampoLogo} alt='Dia D Trampo' width={240} />

          <div className='subtitle'>
            <p>A Plataforma de Talentos</p>
            <p>do Programa Geração Caldeira</p>
          </div>
        </div>

        <FormData>
          <InputBox>
            <Input
              type='email'
              placeholder='Digite seu E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputBox>

          <InputBox>
            <Input
              type='password'
              placeholder='Digite sua senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </InputBox>

          <InputButton>
            <Button type='button' onClick={handleLogin}>
              Entrar
            </Button>
          </InputButton>
        </FormData>
        {error && <p>{error}</p>}
      </Content>
    </MainContainer>
  );
}
