import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInRouteAnimation = trigger('routeAnimations', [
  transition(
    'loginPage <=> signupPageBasic, loginPage <=> signupPageLogin, signupPageBasic <=> signupPageLogin, loginPage <=> forgotPwdPage',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ right: '-100%' })]),
      query(':leave', [style({ opacity: 0 })], { optional: true }),
      group([
        query(':leave', [animate('300ms ease-out', style({ right: '100%' }))]),
        query(':enter', [animate('300ms ease-out', style({ right: '0%' }))]),
      ]),
    ]
  ),
  transition(
    'loginPage <=> signupPageBasic, loginPage <=> signupPageLogin, signupPageBasic <=> signupPageLogin, loginPage <=> forgotPwdPage',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ right: '-100%' })]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(
          ':leave',
          [animate('200ms ease-out', style({ right: '100%', opacity: 0 }))],
          { optional: true }
        ),
        query(':enter', [animate('300ms ease-out', style({ right: '0%' }))]),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]
  ),
]);
