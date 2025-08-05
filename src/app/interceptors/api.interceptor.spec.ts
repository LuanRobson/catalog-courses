import { TestBed } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  it('should be created', () => {
    expect(ApiInterceptor).toBeTruthy();
  });

  it('should be a function', () => {
    expect(typeof ApiInterceptor).toBe('function');
  });
}); 