import { TestBed } from '@angular/core/testing';

import { SideNavService } from './sidenav.service';

describe('SlideNavService', () => {
  let service: SideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
