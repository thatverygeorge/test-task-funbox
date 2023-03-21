import { useRef, useState } from 'react';
import { useMorpherDeclension } from '@/hooks/useMorpherDeclension';
import { useMorpherSpell } from '@/hooks/useMorpherSpell';

const SUB_HEADING = 'Сказочное заморское яство';
const SUB_HEADING_ON_UNSELECTION = 'Котэ не одобряет?';

function ProductCard(props) {
  const { id, mainIngredient, numOfServings, numOfGifts, weight, description, isCustomerSatisfied, isAvailable } =
    props.product;

  const [isSelected, setIsSelected] = useState(false);

  const conjugatedMainIngredient = useMorpherDeclension(id, mainIngredient);
  const conjugatedNumOfServings = useMorpherSpell(id, numOfServings, 'порция');
  const conjugatedNumOfGifts = useMorpherSpell(id, numOfGifts, 'мышь');

  const subHeadingRef = useRef(null);

  function handleSelection() {
    if (isAvailable) {
      setIsSelected(!isSelected);

      if (subHeadingRef.current) {
        subHeadingRef.current.textContent = SUB_HEADING;
      }
    }
  }

  function handleHover(evt, subHeading) {
    if (isAvailable) {
      evt.currentTarget.classList.add('product--hover-ready');

      if (subHeadingRef.current && isSelected) {
        subHeadingRef.current.textContent = subHeading;
      }
    }
  }

  function handleMouseEnter(evt) {
    handleHover(evt, SUB_HEADING_ON_UNSELECTION);
  }

  function handleMouseLeave(evt) {
    handleHover(evt, SUB_HEADING);
  }

  return (
    <article
      className={`product ${isSelected ? 'product--selected' : ''} ${
        !isAvailable ? 'product--unavailable' : ''
      }`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product__container" onClick={handleSelection}>
        <h2 className="product__heading">
          {conjugatedMainIngredient === '' ? (
            <>
              <span>Нямушка</span> ({mainIngredient})
            </>
          ) : (
            <>
              <span>Нямушка</span> c {conjugatedMainIngredient}
            </>
          )}
        </h2>
        <h3 ref={subHeadingRef} className="product__sub-heading">
          {SUB_HEADING}
        </h3>

        <div className="product__features">
          {conjugatedNumOfServings === '' ? (
            <p>
              порций: <span>{numOfServings}</span>
            </p>
          ) : (
            <p>
              <span>{numOfServings}</span> {conjugatedNumOfServings}
            </p>
          )}
          {conjugatedNumOfGifts === '' ? (
            <p>
              мышей в подарок: <span>{numOfGifts}</span>
            </p>
          ) : (
            <p>
              {numOfGifts > 1 && <span>{numOfGifts}</span>} {conjugatedNumOfGifts} в подарок
            </p>
          )}
          {isCustomerSatisfied && <p>заказчик доволен</p>}
        </div>

        <div className="product__weight">
          <span>{weight.toString().replace('.', ',')}</span>
          <br />
          кг
        </div>
      </div>

      {!isSelected && isAvailable && (
        <p className="product-description product__description">
          Чего сидишь? Порадуй котэ,{' '}
          <button className="button product__button product__button--buy" type="button" onClick={handleSelection}>
            купи{' '}
            <span className="visually-hidden">
              нямушку с {conjugatedMainIngredient === '' ? mainIngredient : conjugatedMainIngredient}
            </span>
          </button>
          <span className="product-description__dot">.</span>
        </p>
      )}

      {isSelected && isAvailable && <p className="product__description">{description}</p>}

      {!isAvailable && <p className="product__description">Печалька, с {conjugatedMainIngredient} закончился.</p>}
    </article>
  );
}

export default ProductCard;
