import { v4 as uuidv4 } from 'uuid';

export default {
  word(data) {
    const id = data.id ? data.id : uuidv4();    
    let {name, definition, category} = data;
    // remove empty entries
    definition.forEach(def => {
      def.entries = def.entries.filter(entry => entry !== '');
    })

    // remove definitions with no entries
    definition = definition.filter(def => def.entries.length)

    const partsOfSpeech = definition.map(def => def.partOfSpeech);

    // update category
    partsOfSpeech.forEach(part => {
      if(!category.includes(part)) {
        category.push(part)
      }
    })
    return {name, id, category, definition};
  }
}
