import AppDispatcher from '../dispatcher/AppDispatcher';
import ContactConstants from '../constants/ContactConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _contacts = [];
let _contact = {};

function setContacts(contacts) {
  _contacts = contacts;
}

function setContact(contact) {
  _contact = contact;
}

class ContactStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
  getContacts() {
    return _contacts;
  }
  getContact() {
    return _contact[0];
  }
}

const ContactStore = new ContactStoreClass();

ContactStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case ContactConstants.RECEIVE_CONTACTS:
      setContacts(action.contacts);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      ContactStore.emitChange();
      break

    case ContactConstants.RECEIVE_CONTACT:
      setContact(action.contact);
      console.log(action.contact);
      ContactStore.emitChange();
      break

    case ContactConstants.RECEIVE_CONTACT_ERROR:
//      alert(action.message);
      setContact([{name: "Please Login To View"}])
      ContactStore.emitChange();
      break

    case ContactConstants.RECEIVE_CONTACTS_ERROR:
//      alert(action.message);
      setContact([{name: "Please Login To View"}])
      ContactStore.emitChange();
      break

    default:
  }
});

export default ContactStore;
