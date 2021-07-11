import { Credentials, Get } from 'faunadb';
import { Config } from '../Interfaces';
import ConfigJson from '../config.json'

class FaunaConnector {
    faunadb: any = null;
    client: any = null;
    config: Config = ConfigJson;
    
    constructor() {
        this.faunadb = require('faunadb');
        this.client = new this.faunadb.Client({ secret: this.config.faunaKey});
    }

    async getDocument(collectionName: string, id: string): Promise<any> {
        const {
            Get,
            Select,
            Ref,
            Match,
            Index,
            Create,
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