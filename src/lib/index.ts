
export function formDataToObject(formData: FormData) {
	const object = {};

	formData.forEach((value, key) => {
		const keys = key.split('_');
		setObjectProperty(object, keys, value);
	});

	return object;
}


function setObjectProperty(obj: any, keys: any, value: any) {
	const currentKey = keys.shift();
	if (keys.length === 0) {
		// console.log(currentKey,value)
		if (currentKey === 'multiple') {
			obj[currentKey] = value === 'on';
		} else {
			obj[currentKey] = value ? value : {};
		}
	} else {
		obj[currentKey] = obj[currentKey] || (isNaN(keys[0]) ? {} : []);
		setObjectProperty(obj[currentKey], keys, value);
	}
}

export function objectExtract(obj: ObjectExtract) {
	const returnObject: any = {};
	const nestedValues = Object.values(obj);
	const cal: any = [];
	if (Array.isArray(nestedValues[0])) {
		nestedValues[0].forEach((item: any, i: number) => {
			const aaa: any = {};
			Object.keys(obj).forEach((key: any) => {
				if (typeof obj[key][i] === 'object') {
					aaa[key] = objectExtract(obj[key][i]);
				} else {
					aaa[key] = obj[key][i];
				}
			});
			cal.push(aaa);
		});
		return cal;
	}
	Object.entries(obj).forEach(([key, value]) => {
		if (typeof value === 'string') {
			returnObject[key] = value;
		}
		else if (typeof value === 'object') {
			const nestedKeys = Object.keys(value);
			const calc: any = [];

			if (Array.isArray(value[nestedKeys[0]])) {
				value[nestedKeys[0]].forEach((item: any, i: number) => {
					const aaa: any = {};
					nestedKeys.forEach((nestedKey: any) => {
						if (typeof value[nestedKey][i] === 'object') {
							aaa[nestedKey] = objectExtract(value[nestedKey][i]);
						} else {
							aaa[nestedKey] = value[nestedKey][i];
						}
					});
					calc.push(aaa);
				});
			}

			returnObject[key] = calc;
		}
	});

	return returnObject;
}



type ObjectExtract = {
	[key: string]: any
}
