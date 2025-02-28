import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const requestInfo = 'Request! . . .';
    console.log(requestInfo);
    return {
      async willSendResponse() {
        console.log('Response! . . .');
      },
    };
  }
}
