import _                     from 'lodash';
import Divider               from '../Divider';
import Link                  from '../Link';
import ProfileContainer      from '../ProfileContainer';
import React                 from 'react';
import RippedTicketContainer from '../RippedTicketContainer';
import styles                from './styles.module.scss';
import SummaryRowType        from './SummaryRowType';
import TimeLeftCounter       from '../../components/TimeLeftCounter';
import classNames            from 'classnames';
import SelectionHelper       from '../../helper/SelectionHelper';
import Highlight             from '../Highlight';
import HighlightTheme        from '../Highlight/HighlightTheme';

const BetSummaryContainer = ({ className, containerClassName, containerImage, marketQuestion, endDate, summaryRows, onClick }) => {
    const renderSummaryRow = (summaryRow, index) => {
        const type = _.get(summaryRow, 'type', SummaryRowType.keyValue);

        switch (type) {
            case SummaryRowType.keyValue:
                const key            = _.get(summaryRow, 'key');
                const keyBold        = _.get(summaryRow, 'keyBold');
                const value          = _.get(summaryRow, 'value');
                const valueBold      = _.get(summaryRow, 'valueBold');
                const valueColor     = _.get(summaryRow, 'valueColor');
                const valueHighlight = _.get(summaryRow, 'valueHighlight');
                const isLink         = _.get(summaryRow, 'isLink');

                return renderSingleSummaryRow(index, key, value, keyBold, valueBold, valueColor, valueHighlight, isLink);

            case SummaryRowType.divider:
                return <Divider key={index} />;
        }
    };

    const renderSingleSummaryRow = (index, key, value, keyBold = false, valueBold = false, valueColor = null, valueHighlight = null, isLink = false) => {
        return (
            <div
                className={classNames(
                    styles.summaryTicketRow,
                    className,
                )}
                key={index}
            >
                <span
                    className={classNames(
                        styles.key,
                        keyBold ? styles.bold : null,
                    )}
                >
                    {key}
                </span>
                {
                    isLink ?
                        (
                            <Link
                                to={value}
                                target={'_blank'}
                                className={classNames(
                                    valueBold ? styles.bold : null,
                                )}
                            >
                                {value}
                            </Link>
                        ) :
                        (
                            <span
                                className={classNames(
                                    valueBold ? styles.bold : null,
                                    SelectionHelper.get(
                                        valueColor,
                                        {
                                            ['red']:   styles.textColorRed,
                                            ['green']: styles.textColorGreen,
                                        },
                                    ),
                                )}
                            >
                                {value}
                                {valueHighlight && <Highlight
                                    className={styles.highlight}
                                    highlightType={valueHighlight}
                                />}
                            </span>
                        )
                }
            </div>
        );
    };

    const renderEventEndDate = () => {
        if (endDate) {
            return (
                <div className={styles.summaryTimeLeftContainer}>
                    <span>
                        End of Event:
                    </span>
                    <TimeLeftCounter endDate={endDate} />
                </div>
            );
        }

        return null;
    };

    const getHeaderImageStyle = () => {
        return {
            backgroundImage: 'url("' + containerImage + '")',
        };
    };

    const renderHeader = () => {
        if (containerImage) {
            return (
                <div
                    className={styles.headerImageContainer}
                    style={getHeaderImageStyle()}
                >
                </div>
            );
        }

        return (
            <ProfileContainer />
        );
    };

    return (
        <RippedTicketContainer
            className={classNames(
                styles.summaryTicketContainer,
                containerImage ? styles.summaryTicketContainerWithContainerImage : null,
                containerClassName,
            )}
            onClick={onClick}
        >
            {renderHeader()}
            <span className={styles.summaryTicketHeadline}>
                {marketQuestion}
            </span>
            {
                _.map(summaryRows, renderSummaryRow)
            }
            {renderEventEndDate()}
        </RippedTicketContainer>
    );
};

export default BetSummaryContainer;
