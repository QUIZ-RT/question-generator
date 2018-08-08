import { createStore } from 'redux';
import deepFreeze from 'deep-freeze';
import createReducer from '../../src/js/redux/redux.reducer';
const chai = require('chai');
const should = chai.should();

describe('TopicManager', function() {
  it('Should update topic', function() {
    const initialState = deepFreeze({
        topics: [{
          id: 1,
          createdBy: 'Pallavi',
          createdDate: new Date(),
          modifiedDate: new Date(),
          published: true,
          topicText: 'Cricket',
          topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png'
        },
        {
            id: 2,
            createdBy: 'Pallavi',
            createdDate: new Date(),
            modifiedDate: new Date(),
            published: true,
            topicText: 'Sports',
            topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
             
          },
          {
            id: 3,
            createdBy: 'Pallavi Jain',
            createdDate: new Date(),
            modifiedDate: new Date(),
            published: true,
            topicText: 'Bollywood',
            topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
             
          }]
      });
  

    const store = createStore(createReducer, initialState);

    // console.log('store.getState()', store.getState());

    console.log('store.getState()', store.getState());

    store.getState().should.have.property('topics').of.length(3);
    store.getState().topics[1].should.have.property('id');
    store.getState().topics[1].should.have.property('topicText').and.equal('Sports');
    store.getState().topics[1].should.have.property('published').and.equal(true);
    const topicObj = {
      id: 2,
      createdBy: 'Pallavi Jain',
      createdDate: new Date(),
      modifiedDate: new Date(),
      published: true,
      topicText: 'Bollywood1',
      topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
       
    }
    store.dispatch({
      type: 'UPDATE_TOPIC',
      topic: topicObj
    });
    store.getState().should.have.property('topics').of.length(3);
    store.getState().topics[2].should.have.property('id').and.equal(3);
    store.getState().topics[2].should.have.property('topicText').and.equal('Bollywood');
    store.getState().topics[2].should.have.property('published').and.equal(true);
    console.log('store.getState()', store.getState());

    
  });
  it('Should delete topic', function() {
    const initialState = deepFreeze({
      topics: [{
        id: 1,
        createdBy: 'Pallavi',
        createdDate: new Date(),
        modifiedDate: new Date(),
        published: true,
        topicText: 'Cricket',
        topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png'
      },
      {
          id: 2,
          createdBy: 'Pallavi',
          createdDate: new Date(),
          modifiedDate: new Date(),
          published: true,
          topicText: 'Sports',
          topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
           
        },
        {
          id: 3,
          createdBy: 'Pallavi Jain',
          createdDate: new Date(),
          modifiedDate: new Date(),
          published: true,
          topicText: 'Bollywood',
          topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
           
        }]
    });


  const store = createStore(createReducer, initialState);
  const topicObj = {
    id: 2,
    
     
  }

  store.dispatch({
    type: 'DELETE_TOPIC',
    topic: topicObj
  });
  store.getState().should.have.property('topics').of.length(2);
  store.getState().topics[1].should.have.property('id').and.equal(3);
  store.getState().topics[1].should.have.property('topicText').and.equal('Bollywood');
  
  console.log('store.getState()', store.getState());
  });
});
