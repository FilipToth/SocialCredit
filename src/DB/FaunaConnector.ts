import { Credentials, Get } from 'faunadb';
import { Config } from '../Interfaces';

class FaunaConnector {
    faunadb: any = null;
    client: any = null;
    
    constructor() {
        this.faunadb = require('faunadb');
        this.client = new this.faunadb.Client({ secret: process.env.FAUNA_KEY});
    }

    async getDocument(collectionName: string, id: string): Promise<any> {
        const {
            Get,
            Ref,
            Collection,
          } = this.faunadb.query;

        const doc = await this.client.query(
            Get(
                Ref(
                    Collection(collectionName),
                    id
                )
            )
        );

        return doc;
    }

    async updateDocument(collectionName: string, id: string, changedData: any): Promise<any> {
        const {
            Ref,
            Collection,
            Update,
        } = this.faunadb.query;

        const response = await this.client.query( 
            Update(
                Ref(
                    Collection(collectionName),
                    id
                ),
                changedData
            )
        );

        return response;
    }
}

export default FaunaConnector;