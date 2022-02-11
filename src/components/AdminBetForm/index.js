import { useEffect, useState } from 'react';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Tags,
  InputError,
} from '../Form';
import * as Api from 'api';
import styles from './styles.module.scss';
import { setUniqueSlug } from 'helper/Slug';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from '../Form/utils/validators';
import Moment from 'moment';
import classNames from 'classnames';
import HighlightType from 'components/Highlight/HighlightType';
import { BetActions } from 'store/actions/bet';

const AdminBetForm = ({ event, bet = null, visible, createBet, editBet }) => {
  const isEdit = !!bet;

  const [marketQuestion, setMarketQuestion, marketQuestionErrors] =
    useValidatedState(bet?.market_question, [Validators.required]);
  const [description, setDescription, descriptionErrors] = useValidatedState(
    bet?.description,
    [Validators.required]
  );
  const [slug, setSlug, slugErrors] = useValidatedState(bet?.slug, [
    Validators.required,
  ]);
  const [outcomes, setOutcomes, outcomesErrors] = useValidatedState(
    bet?.outcomes || [{ id: Date.now(), name: '' }],
    [Validators.minLength(2), Validators.requiredTags]
  );
  const [
    evidenceDescription,
    setEvidenceDescription,
    evidenceDescriptionErrors,
  ] = useValidatedState(bet?.evidence_description, [Validators.required]);

  const [evidenceSource, setEvidenceSource, evidenceSourceErrors] =
    useValidatedState(bet?.evidence_source, [Validators.required]);

  const [endDate, setEndDate, endDateErrors] = useValidatedState(
    bet?.end_date || new Moment().add(1, 'hour'),
    [Validators.required, ...(!bet ? [Validators.dateAfter(new Moment())] : [])]
  );

  const betSlugs = event.bet.slug;

  const onNameChange = newName => {
    setMarketQuestion(newName);
    setUniqueSlug(newName, betSlugs, setSlug);
  };

  const handleSave = () => {
    const newBet = {
      event: event.id,
      marketQuestion,
      description,
      slug,
      evidenceDescription,
      evidenceSource,
      outcomes: outcomes
        .map((t, index) => ({ name: t.name, index }))
        .filter(t => t.name !== ''),
      endDate,
      start_date: bet?.date || new Date(),
    };

    if (bet) {
      editBet({ betId: bet.id, bet: newBet });
    } else {
      createBet({ bet: newBet });
    }
  };

  const handleTagChange = (name, id) => {
    setOutcomes(prevOutcomes =>
      prevOutcomes.map(tag => (tag.id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    !isEdit &&
      setOutcomes(prevOutcomes => [
        ...prevOutcomes,
        { _id: Date.now().toString(), name: '' },
      ]);
  };

  const removeTag = id => {
    !isEdit &&
      setOutcomes(prevOutcomes => prevOutcomes.filter(tag => tag._id !== id));
  };

  const isFormValid =
    [
      marketQuestionErrors,
      descriptionErrors,
      slugErrors,
      outcomesErrors,
      evidenceDescriptionErrors,
      evidenceSourceErrors,
      endDateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0;

  const fgClasses = err =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError
    );

  return (
    <>
      <FormGroup className={fgClasses(marketQuestionErrors)}>
        <InputLabel>Name</InputLabel>
        <Input type="text" value={marketQuestion} onChange={onNameChange} />
        <InputError errors={marketQuestionErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(slugErrors)}>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
        <InputError errors={slugErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(descriptionErrors)}>
        <InputLabel>Description</InputLabel>
        <Input type="text" value={description} onChange={setDescription} />
        <InputError errors={descriptionErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(outcomesErrors)}>
        <InputLabel>Options</InputLabel>
        <Tags
          tags={outcomes}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
          preventAdd={isEdit}
          preventRemove={isEdit}
        />
        <InputError
          errors={outcomesErrors}
          placeholderValues={{
            minLength: ['2', 'outcomes'],
            hasEmptyMembers: ['outcomes'],
          }}
        />
      </FormGroup>
      <FormGroup className={fgClasses(evidenceDescriptionErrors)}>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={setEvidenceDescription}
        />
        <InputError errors={evidenceDescriptionErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(evidenceSourceErrors)}>
        <InputLabel>Evidence Source</InputLabel>
        <Input
          type="text"
          value={evidenceSource}
          onChange={setEvidenceSource}
        />
        <InputError errors={evidenceSourceErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(endDateErrors)}>
        <InputLabel>End Date</InputLabel>
        <DateTimePicker
          value={endDate}
          onChange={date => setEndDate(date)}
          ampm={false}
        />
        <InputError
          errors={endDateErrors}
          placeholderValues={{
            dateBeforeLimit: [new Moment().format('DD.MM.YYYY HH:mm')],
          }}
        />
      </FormGroup>
      <div className={styles.buttonContainer}>
        <Button
          className={classNames(styles.button, !isFormValid && styles.disabled)}
          highlightType={HighlightType.highlightModalButton2}
          withoutBackground={true}
          disabledWithOverlay={false}
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save
        </Button>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createBet: payload => {
      dispatch(BetActions.create(payload));
    },
    editBet: payload => {
      dispatch(BetActions.edit(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.visible &&
      [PopupTheme.newBet, PopupTheme.editBet].includes(state.popup.popupType),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBetForm);
