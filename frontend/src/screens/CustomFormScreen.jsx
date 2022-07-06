import React from 'react';
import { Container } from 'react-bootstrap';

const CustomFormScreen = () => {
  return (
    <Container style={{ marginTop: '150px' }}>
      <form>
        <fieldset>
          <legend>Enter Your Custom Request Details</legend>
          <div class='form-group'>
            <label for='exampleSelect1' class='form-label mt-4'>
              Category
            </label>
            <select class='form-select' id='exampleSelect1'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class='form-group'>
            <label for='exampleSelect1' class='form-label mt-4'>
              Material
            </label>
            <select class='form-select' id='exampleSelect1'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <fieldset class='form-group'>
            <label for='optionsRadios' class='form-label mt-4'>
              Gender
            </label>
            <div class='form-check'>
              <label class='form-check-label'>
                <input
                  type='radio'
                  class='form-check-input'
                  name='optionsRadios'
                  id='optionsRadios1'
                  value='Male'
                />
                Male
              </label>
            </div>
            <div class='form-check'>
              <label class='form-check-label'>
                <input
                  type='radio'
                  class='form-check-input'
                  name='optionsRadios'
                  id='optionsRadios2'
                  value='Female'
                />
                Female
              </label>
            </div>
            <div class='form-check'>
              <label class='form-check-label'>
                <input
                  type='radio'
                  class='form-check-input'
                  name='optionsRadios'
                  id='optionsRadios3'
                  value='Any'
                />
                Any
              </label>
            </div>
          </fieldset>

          <div class='form-group'>
            <label for='exampleTextarea' class='form-label mt-4'>
              Additional Notes
            </label>
            <textarea
              class='form-control'
              id='exampleTextarea'
              rows='3'
            ></textarea>
          </div>

          <button type='submit' class='btn btn-primary my-4'>
            Find A Tailor
          </button>
        </fieldset>
      </form>
    </Container>
  );
};

export default CustomFormScreen;
