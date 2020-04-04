import { v4 as uuidv4 } from 'uuid';

export default {
  word(data) {
    const id = data.id ? data.id : uuidv4();    
    let {name, definition, category} = data;
    const partsOfSpeech = definition.map(def => def.partOfSpeech);
    partsOfSpeech.forEach(part => {
      if(!category.includes(part)) {
        category.push(part)
      }
    })
    return {name, id, category, definition};
  }
}
