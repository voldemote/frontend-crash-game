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

const BetSummaryContainer = ({ marketQuestion, endDate, summaryRows, onClick }) => {
    const renderSummaryRow = (summaryRow, index) => {
        const type = _.get(summaryRow, 'type', SummaryRowType.keyValue);

        switch (type) {
            case SummaryRowType.keyValue:
                const key        = _.get(summaryRow, 'key');
                const keyBold    = _.get(summaryRow, 'keyBold');
                const value      = _.get(summaryRow, 'value');
                const valueBold  = _.get(summaryRow, 'valueBold');
                const valueColor = _.get(summaryRow, 'valueColor');
                const isLink     = _.get(summaryRow, 'isLink');

                return renderSingleSummaryRow(index, key, value, keyBold, valueBold, valueColor, isLink);

            case SummaryRowType.divider:
                return <Divider key={index} />;
        }
    };

    const renderSingleSummaryRow = (index, key, value, keyBold = false, valueBold = false, valueColor = null, isLink = false) => {
        return (
            <div
                className={styles.summaryTicketRow}
                key={index}
            >
                <span
                    className={classNames(
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
                        Event ends in:
                    </span>
                    <TimeLeftCounter endDate={endDate} />
                </div>
            );
        }

        return null;
    };

    return (
        <RippedTicketContainer
            className={styles.summaryTicketContainer}
            onClick={onClick}
        >
            <ProfileContainer />
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
