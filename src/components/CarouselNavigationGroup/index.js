import classNames      from 'classnames';
import Icon            from '../Icon';
import IconTheme       from '../Icon/IconTheme';
import IconType        from '../Icon/IconType';
import React           from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import styles          from './styles.module.scss';

const CarouselNavigationGroup = ({ next, previous, ...rest }) => {
    const { carouselState: { currentSlide, totalItems, slidesToShow } } = rest;

    return (
        <div className={styles.arrowContainer}>
            <Icon
                className={classNames(
                    styles.arrow,
                    SelectionHelper.get(
                        currentSlide,
                        {
                            [0]: styles.arrowDisabled,
                        },
                        null,
                        false,
                    ),
                )}
                iconTheme={IconTheme.white}
                iconType={IconType.left}
                onClick={previous}
            />
            <Icon
                className={classNames(
                    styles.arrow,
                    SelectionHelper.get(
                        currentSlide,
                        {
                            [totalItems - slidesToShow]: styles.arrowDisabled,
                        },
                        null,
                        false,
                    ),
                )}
                iconTheme={IconTheme.white}
                iconType={IconType.right}
                onClick={next}
            />
        </div>
    );
};
export default CarouselNavigationGroup;
