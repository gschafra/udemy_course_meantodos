import { TestBed, inject } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';

describe('a confirm component', () => {
	let component: ConfirmComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ConfirmComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ConfirmComponent], (ConfirmComponent) => {
		component = ConfirmComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});