describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://gestion-sinistre.suntelecoms.com/'),
    cy.contains('DÉCLARER UN SINISTRE').click({force : true}),
    cy.contains('Non').click({force : true}),
    cy.get('input').then(($input) => {
      cy.log($input.attr('formcontrolname'));
     if( $input.attr('formcontrolname')=='lala'){
      cy.log('hello')
     } else {
      cy.log('hlalaello')
     }
   });
  })
})