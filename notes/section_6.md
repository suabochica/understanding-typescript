Understanding JavaScript
========================

Section 6: Namespacces and Modules
----------------------------------

1. Check the next code:

```javascript

namespace myMath() {
	const PI = 3.14;

	export function calculateCircunference(diameter: number) {
		return diameter * PI;
	}
}
```

2. The namespace allow us split our code avoiding the use of global scope. The TS compiler use JS IIFE to split the code blocks 