import _               from 'lodash';
import Divider         from '../Divider';
import Link            from '../Link';
import React           from 'react';
import styles          from './styles.module.scss';
import SummaryRowType  from './SummaryRowType';
import classNames      from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import Highlight       from '../Highlight';

const SummaryRowContainer = ({ className, summaryRows }) => {
    const renderSummaryRow = (summaryRow, index) => {
        const type = _.get(summaryRow, 'type', SummaryRowType.keyValue);

        switch (type) {
            case SummaryRowType.keyValue:
                const flexDirectionColumn = _.get(summaryRow, 'flexDirectionColumn');
                const key                 = _.get(summaryRow, 'key');
                const keyBold             = _.get(summaryRow, 'keyBold');
                const value               = _.get(summaryRow, 'value');
                const valueBold           = _.get(summaryRow, 'valueBold');
                const valueBig            = _.get(summaryRow, 'valueBig');
                const valueColor          = _.get(summaryRow, 'valueColor');
                const valueChildren       = _.get(summaryRow, 'valueChildren');
                const valueHighlight      = _.get(summaryRow, 'valueHighlight');
                const isLink              = _.get(summaryRow, 'isLink');

                return renderSingleSummaryRow(index, key, value, keyBold, valueBold, valueBig, valueColor, valueHighlight, isLink, valueChildren, flexDirectionColumn);

            case SummaryRowType.divider:
                return <Divider key={index} />;

            case SummaryRowType.emptyLine:
                return renderEmptyLine();
        }
    };

    const renderEmptyLine = () => {
        return (
            <div className={styles.emptyRow}>
            </div>
        );
    };

    const renderSingleSummaryRow = (index, key, value, keyBold = false, valueBold = false, valueBig = false, valueColor = null, valueHighlight = null, isLink = false, valueChildren = null, flexDirectionColumn = false) => {
        return (
            <div
                className={classNames(
                    styles.summaryTicketRow,
                    flexDirectionColumn ? styles.summaryTicketRowColumnDirection : null,
                    className,
                )}
                key={index}
            >
                {
                    key && (
                        <span
                            className={classNames(
                                styles.key,
                                keyBold ? styles.bold : null,
                            )}
                        >
                            {key}
                        </span>
                    )
                }
                {
                    valueChildren ?
                        valueChildren :
                        (
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
                                            valueBig ? styles.big : null,
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
                        )
                }
            </div>
        );
    };

    return (
        <>
            {
                _.map(summaryRows, renderSummaryRow)
            }
        </>
    );
};

export default SummaryRowContainer;
