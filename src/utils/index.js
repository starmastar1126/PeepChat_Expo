/**
 * Check if object is empty
 *
 * @param {object} obj
 *
 * @returns {boolean}
 */
export function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }

    return true;
}

/**
 *
 * @param {promise} promise
 *
 * Returns the value from a promise and an error if it exists.
 *
 * @returns {array} [value, error]
 */
export async function promisify(promise) {
    try {
        return [await promise, null];
    } catch (e) {
        return [null, e];
    }
}

/**
 * Returns new object with only keys
 * specified in keys param
 *
 * @param {object} obj
 * @param {array} keys array of strings
 *
 * @returns {object}
 */
export function pick(obj, keys) {
    if (!obj || !keys) {
        throw new Error('Both parameters must be supplied.');
    }
    if (typeof obj !== 'object') {
        throw new Error('First parameter must be an object.');
    }
    if (!Array.isArray(keys)) {
        throw new Error('Second parameter must be an array.');
    }

    return Object.assign(
        {},
        ...keys.map(k => (k in obj ? { [k]: obj[k] } : {})),
    );
}

/**
 * Returns new object without keys
 * specified in keys param
 *
 * @param {object} obj
 * @param {array} keys array of strings
 *
 * @returns {object}
 */
export function reject(obj, keys) {
    if (!obj || !keys) {
        throw new Error('Both parameters must be supplied.');
    }
    if (typeof obj !== 'object') {
        throw new Error('First parameter must be an object.');
    }
    if (!Array.isArray(keys)) {
        throw new Error('Second parameter must be an array.');
    }

    return Object.assign(
        {},
        ...Object.keys(obj)
            .filter(k => !keys.includes(k))
            .map(k => ({ [k]: obj[k] })),
    );
}

/**
 * Checks input elements in obj,
 * if any value is empty returns false.
 *
 * @param {object} obj
 *
 * @returns {boolean}
 */
export function isEmptyInput(obj) {
    if (!obj || isEmpty(obj)) {
        throw new Error('An object of input key, values must be supplied.');
    }

    return Object.values(obj).every(value => value && value.trim() !== '');
}

export function merge(objects) {
    const out = {};

    for (let i = 0; i < objects.length; i++) {
        for (const p in objects[i]) {
            out[p] = objects[i][p];
        }
    }

    return out;
}

export function flatten(obj, name, stem) {
    let out = {};
    const newStem =
        typeof stem !== 'undefined' && stem !== ''
            ? `${stem}[${name}]`
            : `[${name}]`;

    if (typeof obj !== 'object') {
        out[newStem] = obj;
        return out;
    }

    for (const p in obj) {
        const prop = flatten(obj[p], p, newStem);
        out = merge([out, prop]);
    }

    return out;
}
