import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Documentação da API do Sistema de Administração de Filiais',
    description: 'Essa é uma API para gerenciar o funcionamento das filiais',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'API relacionada ao gerenciamento de usuários',
    },
    {
      name: 'Branches',
      description: 'API relacionada ao gerenciamento de filiais',
    },
    {
      name: 'Employees',
      description: 'API relacionada ao gerenciamento de funcionários',
    },
  ],
  paths,
  schemas,
  components,
};
