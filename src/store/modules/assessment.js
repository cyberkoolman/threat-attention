import { data } from '@/data';

const GET_TARS = 'getTARs';
const ADD_TAR = 'addTAR';
const DELETE_TAR = 'deleteTAR';
const UPDATE_TAR = 'udpateTAR';  

const GET_ACS = 'getAbuseCases';

const state = {
    assessments: [],
    abusecases: []
};
  
const getters = {
    getTarById: state => id => state.assessments.find(t => t.id === id),
    getAbuseCasesById: state => (id, assessment) => state.abusecases.filter(a => a.id == assessment.abusecases)
};

const actions = {
    async getTARsAction({ commit }) {
        const assessments = await data.getTARs();
        commit(GET_TARS, assessments);
    },
    async getACsAction({ commit }) {
        const abusecases = await data.getAbuseCases();
        commit(GET_ACS, abusecases);
    }   
};

const mutations = {
    [GET_TARS](state, assessments) {
      state.assessments = assessments;
    },
    [GET_ACS](state, abusecases) {
        state.abusecases = abusecases;
    }  
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  };