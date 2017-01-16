/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TasksCardComponent } from './tasks.component';

describe('TasksCard', () => {
  let component: TasksCard;
  let fixture: ComponentFixture<TasksCard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksCard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
