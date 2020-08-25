import React, { Component } from 'react'
import { CLIENT_SECRET, CLIENT_ID, LOCAL_DB_NAME } from 'react-native-dotenv'
import moment from 'moment';
import MCloud from './mtc'
let ApplicationStorage = MCloud(LOCAL_DB_NAME, {auto_compaction: true});

class API {
  constructor({url}){
    __DEV__ && console.log("Constructing API", url)
    this.url = url;
    this.endpoints = {};
    this.access_token = null;

    this.Auth = this.Auth.bind();
  }

  /**
   * Log in
   * @param {username} string
   * @param {password} string
   **/
   Business = () => {
     return {
       list: () => {

         let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(this.url +'/business', data)
                .then(response => response.json());
       }
     }
   }


   Products = () => {
    return {
      list: (params) => {
        console.log("get products list!", params)
        if(!params.page){
          params.page = 1;
        }


        let url = this.url +'/products?page='+params.page;
        if(params.search){
          url = url+'&search='+params.search
        }

        if(params.category){
          url = url+'&category='+params.category
        }

        if(params.sub_category){
          url = url+'&category='+params.sub_category
        }

        if(params.from_price){
          url = url+'&from_price='+params.from_price
        }
        if(params.to_price){
          url = url+'&to_price='+params.to_price
        }

        console.log("list url!", url)
        let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(url, data)
                .then(response => response.json());
      },
      categories: async() => {
        let url = this.url +'/product_categories/';

        let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(url, data)
                .then(response => response.json());
      },
      findOne: (id) => {
        
        let url = this.url +'/products/'+id;

        let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(url, data)
                .then(response => response.json());
      }
      // https://fenixadmin.staging.keetup.com/api/v1/products?page=1
      // http://fenixadmin.staging.keetup.com/api/v1/products?page=1
    }
   }

   Categories = () => {
    return {
      list: (params) => {
        console.log("get products list!", this)
        if(!params.page){
          params.page = 1;
        }

        let url = this.url +'/categories?page='+params.page;
        if(params.search){
          url = url+'?search='+params.search
        }
        let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(url, data)
                .then(response => response.json());
      },
      findOne: (id) => {
        
        let url = this.url +'/products/'+id;

        let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          //console.log("data business", data)
          return fetch(url, data)
                .then(response => response.json());
      }
      // https://fenixadmin.staging.keetup.com/api/v1/products?page=1
      // http://fenixadmin.staging.keetup.com/api/v1/products?page=1
    }
   }
   /**
   * Auth
   * @returns functions 
   **/
   Auth = () => {
    return {
      /**
       * Log in
       * @param {username} string
       * @param {password} string
       **/
      signIn: (email, password) => {
          let data = {
            method: 'POST',
            body: JSON.stringify({
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              grant_type: 'password',
              username: email,
              password: password
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }
          console.log("DATA ENVIADA A API", data)
          console.log("URL:", this.url +'/oauth/token')
          return fetch(this.url +'/oauth/token', data)
                  .then(response => response.json());
      },
      /**
       * Sign Up
       * @param {first_name} string
       * @param {last_name} string
       * @param {email} string
       * @param {password} string
       **/
      signUp: (first_name, username, email, password) => {
          

          let data = {
            method: 'POST',
            body: JSON.stringify({
              categories: '1,2',
              first_name: first_name,
              last_name: first_name,
              rut: username,
              email: email,
              zip: '0000',
              timezone: 'America/Los_Angeles',
              email_confirmation: email,
              password: password,
              password_confirmation: password,
              registration_date: moment().format('YYYY-MM-DD'),
              address: 'Santa Fe',
              city: 'Santa Fe',
              category_id: '1',
              father_lastname: 'Fort',
              mother_lastname: 'Fort',
              latitude: '0',
              longitude: '0',
              state_id: '5',
              type_id: '1'
            }),
            headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
            }
          }
          return fetch(this.url +'/oauth/register', data)
                  .then(response => response.json());
      },
      /**
       * Get information about user on API
       **/
      me: () => {
          let data = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+this.access_token,
              'Content-Type': 'application/json',
            }
          }
          console.log("data of", data)
          return fetch(this.url +'/me', data)
                  .then(response => response.json());
      },
      /**
       * Set access token
       * @param {response} object
       * @param {access_token} item
       * @param {token_type} item
       * @param {expires_in} item
       **/
      setAccessToken: async(response) => {
        __DEV__ && console.log("[SET ACCESS TOKEN]", response)
        return await ApplicationStorage.upsert('UserData', doc => {
                     this.access_token = response.access_token;
                      doc.token_type = response.token_type;
                      doc.expires_in = response.expires_in
                      doc.access_token = response.access_token;
                      return doc;
                    });
      },
      /**
       * Get information about user stored in app
       * @returns object
       **/
      getMeOffline: async() => {
        let go = await(ApplicationStorage.get('UserData'));
        console.log("get off", go)
        if(this.access_token == null && go.access_token){
          this.access_token = go.access_token;
        }
        console.log("t his a ccess toke!", this)
        return go;
      },
      /**
       * If it's a new user, redirect to Profile instead of Ruta
       * @returns object
       **/
      imNew: () => {
        return ApplicationStorage.upsert('UserData', doc => {
                      doc.isNew = true;
                      return doc;
                    });
      },
      /**
       * Check if user is logged in
       * @returns boolean
       **/
      checkIfLoggedIn: () => {
        return ApplicationStorage.get('UserData')
        .then(res => {
          console.log("API: Check if logged in", res, res.access_token)
          //if(this.access_token)
          if(typeof res.access_token !== 'undefined'){
            this.access_token = res.access_token;
            return true;
          } else {
            return false;
          }
          
        })
        .catch(err => {
          console.log("checkIfLoggedIn: Error: ", err)
          return false;
        })
      },
      /**
       * Contact Hakuna (send message)
       * @method POST
       * @returns boolean
       **/
       contactHakuna: async(message) => {
        let k = await(this.Auth().getMeOffline());
        console.log("RUN IS CHOFER?", k)
        console.log("API!", this)
        console.log("API!", this.Auth())
          let data = {
            method: 'POST',
            body: JSON.stringify({
              email: k.email,
              message: message,
              messaged_at:null,
              name: k.email,
              status_id: 2,
              type_id: 1
            }),
            headers: {
              'Authorization': 'Bearer '+k.access_token,
              'Content-Type': 'application/json',
            }
          }
          console.log("data business", data)
          let s = await(fetch(this.url +'/contacts', data).then(response => response.json()));
          console.log("FETCH!!!!!", s)
          return s;
       },
       /**
       * Contact Hakuna (send message)
       * @method POST
       * @returns boolean
       **/
       saveProfile: async(state) => {
        let k = await(this.Auth().getMeOffline());
        console.log("DATA OF USER", k, state)
        let paramsBody;

        if(state.avatarEdit == false){
          paramsBody = {
              id: k.identifier,
              nombre: state.name,
              father_lastname: state.apellidoPaterno,
              mother_lastname: state.apellidoMaterno,
            }
          
        } else {
          paramsBody = {
              id: k.identifier,
              nombre: state.name,
              father_lastname: state.apellidoPaterno,
              mother_lastname: state.apellidoMaterno,
              hero_image: 'data:image/jpeg;base64,'+state.avatar,
            };
        }
          let data = {
            method: 'PUT',
            body: JSON.stringify(paramsBody),
            headers: {
              'Authorization': 'Bearer '+k.access_token,
              'Content-Type': 'application/json',
            }
          }
          console.log("data profile save", data)
          console.log("identifier url", this.url +'/users/'+k.identifier)
          let s = await(fetch(this.url +'/users/'+k.identifier, data).then(response => response.json()));
          console.log("FETCH!!!!!", s)

          let datos = s.data;
          let u = await(ApplicationStorage.upsert('UserData', doc => {
                     
                      doc.nombre = state.nombre;
                      doc.name = state.nombre;
                      if(state.apellidoMaterno && state.apellidoPaterno){    
                        doc.mother_lastname = state.apellidoPaterno;
                        doc.father_lastname = state.apellidoMaterno;
                      }

                      if(state.avatar != null && datos.hero_image){
                        doc.avatar = datos.hero_image.small;
                      }

                      //doc.last_name = data.last_name;
                      return doc;
                    }))
          return s;
       },
      /**
       * Save data
       * @param {data} object
       * @param {email} item/string
       * @param {last_name} item/string
       * @param {first_name} item/string
       * @param {identifier} item/integer
       * @param {type} item/string
       **/
      saveMe: (data) => {
        console.log("save me!", data)
        return ApplicationStorage.upsert('UserData', doc => {
                     
                      doc.email = data.email;
                      doc.name = data.first_name;
                      doc.mother_lastname = data.mother_lastname;
                      doc.father_lastname = data.father_lastname;
                      //doc.last_name = data.last_name;
                      doc.identifier = data.id;
                      doc.type = data.type;
                      return doc;
                    });
      },
      /**
       * Log out user from API
       * @returns boolean
       **/
      signOut: () => {
        /*return ApplicationStorage.upsert('UserData', doc => {
                     
                      doc.access_token = null;
                      doc.email = null
                      doc.expires_in = null;
                      doc.first_name = null;
                      doc.identifier = null;
                      doc.token_type = null;
                      doc.type = null;
                      doc.token_type = null;
                      doc.last_name = null;
                      return doc;
                    });*/
          return ApplicationStorage.get('UserData').then(function (doc) {
            return ApplicationStorage.remove(doc);
          });
            
      },
      rmNew: () => {
                return ApplicationStorage.remove('CheckRegister');
      },

      isBusiness: async() => {
        
        let k = await(this.Auth().getMeOffline());
        //console.log("RUN IS CHOFER?", k)
        if(k.type == 'standard'){
          return false;
        } else {
          return true;
        }
        //console.log("CHOFER OF!", k)
        //return true;
         /*new Promise((resolve, reject) => {
            // Wait for the user to press the "OK" or "CANCEL" button?
                //if (success) {
                    resolve(true);
               // } else {
                //    reject('User clicked cancel');
               // }
            

        });*/
      },
      update: (toUpdate) =>  axios.put(url,toUpdate),
      create: (toCreate) =>  axios.put(url,toCreate),
      delete: ({ id }) =>  axios.delete(`${url}/${id}`)
    }
  }

}

export default API;