import items from './data.json' with { type: 'json'}

function createMap() {

    const itemMap = new Map();

    items.forEach( (item) => {
        if (itemMap.has(item.category)) {
            itemMap.get(item.category).push(item);
        } else {
            itemMap.set(item.category, Array.from([item]))
        }
    })
    return itemMap;
}

const x = createMap();
console.log(x.keys())
console.log(count(x.get('fruit')));
console.log(count(x.get('vegetable')))
console.log(count(x.get('nut')));


console.log(x.get('fruit').filter( (item) => item.name.toLowerCase().includes('b')))



function count(arr) {
    // let count = 0;
    // arr.forEach( _ => count += 1);
    // return count

    return arr.length;
}