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

const BetSummaryContainer = ({ marketQuestion, endDate, summaryRows }) => {
    const renderSummaryRow = (summaryRow) => {
        const type = _.get(summaryRow, 'type', SummaryRowType.keyValue);

        switch (type) {
            case SummaryRowType.keyValue:
                const key       = _.get(summaryRow, 'key');
                const keyBold   = _.get(summaryRow, 'keyBold');
                const value     = _.get(summaryRow, 'value');
                const valueBold = _.get(summaryRow, 'valueBold');
                const isLink    = _.get(summaryRow, 'isLink');

                return renderSingleSummaryRow(key, value, keyBold, valueBold, isLink);

            case SummaryRowType.divider:
                return <Divider />;
        }
    };

    const renderSingleSummaryRow = (key, value, keyBold = false, valueBold = false, isLink = false) => {
        return (
            <div className={styles.summaryTicketRow}>
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
                                )}
                            >
                                {value}
                            </span>
                        )
                }
            </div>
        );
    };

    return (
        <RippedTicketContainer className={styles.summaryTicketContainer}>
            <ProfileContainer />
            <span className={styles.summaryTicketHeadline}>
                {marketQuestion}
            </span>
            {
                _.map(summaryRows, renderSummaryRow)
            }
            <div className={styles.summaryTimeLeftContainer}>
                <span>
                    Event ends in:
                </span>
                <TimeLeftCounter endDate={endDate} />
            </div>
        </RippedTicketContainer>
    );
};

export default BetSummaryContainer;
