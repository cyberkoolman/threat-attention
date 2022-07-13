import * as axios from 'axios';
import { API } from '@/config';

const getTARs = async function() {
  try {
    const response = await axios.get(`${API}/threatassessments.json`);
    let tars = parseList(response);
    return tars;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTARById = async function(id) {
  try {
    const response = await axios.get(`${API}/threatassessments.json`);
    let tars = parseList(response);
    return tars;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getAbuseCases = async function() {
  try {
    const response = await axios.get(`${API}/abusecases.json`);
    let abusecases = parseList(response);
    return abusecases;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMitigations = async function() {
  try {
    const response = await axios.get(`${API}/mitigations.json`);
    let mitigations = parseList(response);
    return mitigations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status != 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list != 'object') {
    list = [];
  }
  return list;
};

export const data = {
    getTARs,
    getTARById,
    getAbuseCases,
    getMitigations
};
