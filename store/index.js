import axios from 'axios'

export const strict = process.env.NODE_ENV !== 'production';

const SWAPI_URL = process.env.swapiUrl;

export const state = () => ({
  people: []
});

export const mutations = {
  SET_PEOPLE (state, value) {
    state.people = value
  }
};

export const actions = {
  fetchPeople ({ commit, state }) {
    if (state.people.length === 0) {
      return axios.get(`${SWAPI_URL}/people/`).then(
        response => {
          response.data.results.map(person => {
            person.id = +person.url.replace(/https:\/\/swapi.co\/api\/people\/(\d+)\//g, '$1')
          });
          commit('SET_PEOPLE', response.data.results)
        }
      )
    }
  }
};

export const getters = {
  getPersonById (state) {
    return (id) => {
      return state.people.find(person => person.id === +id)
    }
  }
};
