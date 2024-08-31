// Declaration library
// Template engine
export default function html([first, ...string], ...values) {
	return (
		values
			.reduce((acc, cur) => acc.concat(cur, string.shift()), [first])
			// Remove true and false
			.filter((x) => (x && x !== true) || x === 0)
			.join("")
	);
}

// CreateStore
export function createStore(reducer) {
	// state = { cars }
	let state = reducer();
	// Using Map cuz key can be any datatypes
	// Object keys just can be string
	// Element is object
	const roots = new Map();

	// render() loop through roots to render UI
	function render() {
		for (const [root, component] of roots) {
			const htmlCode = component();
			root.innerHTML = htmlCode;
		}
	}

	return {
		// Set and render
		attach(component, root) {
			roots.set(root, component);
			render();
		},

		connect(selector = (state) => state) {
			return (component) =>
				(props, ...args) =>
					component(
						Object.assign({}, props, selector(state), ...args)
					);
		},

		dispatch(action, ...args) {
			state = reducer(state, action, args);
			render();
		},
	};
}
