import { createStore } from 'redux';
import deepFreeze from 'deep-freeze';
import createReducer from '../../src/js/redux/redux.reducer';
const chai = require('chai');
const should = chai.should();

describe('TopicManager', function() {
  it('Should add topic', function() {
    const initialState = deepFreeze({
        topics: [{
          id: Math.random()*892793492 + '',
          createdBy: 'Pallavi',
          createdDate: new Date(),
          modifiedDate: new Date(),
          published: true,
          topicText: 'Cricket',
          topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png'
        }]
      });
  

    const store = createStore(createReducer, initialState);

    // console.log('store.getState()', store.getState());
    const topicObj = {
        id: Math.random()*892793492 + '',
        createdBy: 'Pallavi',
        createdDate: new Date(),
        modifiedDate: new Date(),
        published: true,
        topicText: 'Sports',
        topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
         
      }

      const topicObj1 = {
        id: Math.random()*892793492 + '',
        createdBy: 'Pallavi Jain',
        createdDate: new Date(),
        modifiedDate: new Date(),
        published: true,
        topicText: 'Bollywood',
        topicUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-256/ea-sports-company-brand-logo-390c2fa7fadade88-256x256.png',
         
      }
    store.dispatch({
      type: 'ADD_TOPIC',
      topic: topicObj
    });

    store.dispatch({
        type: 'ADD_TOPIC',
        topic: topicObj1
      });

    console.log('store.getState()', store.getState());

    store.getState().should.have.property('topics').of.length(3);
    store.getState().topics[1].should.have.property('id');
    store.getState().topics[1].should.have.property('topicText').and.equal('Sports');
    store.getState().topics[1].should.have.property('published').and.equal(true);

    
  });
});
