import { useState } from 'react';
import Moment from 'moment';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Select,
  Tags,
  InputError,
} from '../Form';
import { useHistory } from 'react-router';
import Routes from '../../constants/Routes';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { setUniqueSlug } from '../../helper/Slug';
import eventTypes from 'constants/EventTypes';
import BetForm from './BetForm';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from '../Form/utils/validators';
import classNames from 'classnames';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { EventActions } from 'store/actions/event';
import uuid from 'uuid';
import { createMarketEvent, editMarketEvent } from 'api';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const AdminEventForm = ({
  event = null,
  eventSlugs,
  hidePopup,
  eventType,
  createEventSuccess,
  createEventFail,
  editEventSuccess,
  editEventFail
}) => {
  const history = useHistory();
  const isStreamedEventType = eventType === eventTypes.streamed;

  const [name, setName, nameErrors] = useValidatedState(event?.name, [
    Validators.required,
  ]);
  const [slug, setSlug, slugErrors] = useValidatedState(event?.slug, [
    Validators.required,
  ]);

  const streamUrlInitialValue =
    event?.streamUrl || (!isStreamedEventType ? 'dummy' : '');
  const [streamUrl, setStreamUrl, streamUrlErrors] = useValidatedState(
    streamUrlInitialValue,
    (isStreamedEventType && [Validators.required, Validators.isUrl]) || []
  );
  const [preview_image_url, set_preview_image_url, preview_image_url_errors] =
    useValidatedState(event?.preview_image_url, [
      Validators.required,
      Validators.isUrl,
    ]);
  const [category, setCategory, categoryErrors] = useValidatedState(
    event?.category || categoriesOptions[0].value
  );
  const [tags, setTags, tagsErrors] = useValidatedState(
    event?.tags || [{ id: uuid.v4(), name: '' }],
    [Validators.minLength(1), Validators.requiredTags]
  );
  const [date, setDate, dateErrors] = useValidatedState(
    event?.date || new Moment()
  );
  const [betData, setBetData] = useState({});
  const [isBetFormValid, setIsBetFormValid] = useState(
    !!event || isStreamedEventType
  );

  const isFormValid =
    [
      nameErrors,
      slugErrors,
      streamUrlErrors,
      preview_image_url_errors,
      categoryErrors,
      tagsErrors,
      dateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0 && isBetFormValid;

  const onNameChange = newName => {
    const slugs =
      event === null ? eventSlugs : eventSlugs.filter(s => s !== event?.slug);

    setName(newName);
    setUniqueSlug(newName, slugs, setSlug);
  };

  const handleSave = () => {
    const eventData = {
      name,
      slug,
      preview_image_url,
      category,
      tags,
      bet: {
        description: betData.description,
        start_date: date,
        end_date: betData.endDate,
        evidence_description: betData.evidenceDescription,
        evidence_source: betData.evidenceSource,
        liquidity: betData.liquidity,
        market_question: betData.marketQuestion,
        outcomes: betData.outcomes,
        slug: betData.slug,
      },
    };

    if (event) {
      editMarketEvent(event.id, eventData)
        .then(res => {
          history.push(
            Routes.getRouteWithParameters(Routes.event, {
              eventSlug: res.slug,
            })
          );
          editEventSuccess();
        })
        .catch(() => {
          editEventFail();
        });
    } else {
      createMarketEvent(eventData)
        .then(res => {
          history.push(
            Routes.getRouteWithParameters(Routes.event, {
              eventSlug: res.slug,
            })
          );
          createEventSuccess();
        })
        .catch(() => {
          createEventFail();
        });
    }
  };

  const handleTagChange = (name, id) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag.id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setTags(prevTags => [...prevTags, { id: uuid.v4(), name: '' }]);
  };

  const removeTag = id => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  };

  const fgClasses = (err, ...args) =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError,
      ...args
    );

  const renderStreamInput = () => (
    <>
      <FormGroup className={fgClasses(streamUrlErrors)}>
        <InputLabel>Stream URL</InputLabel>
        <Input type="text" value={streamUrl} onChange={setStreamUrl} />
        <InputError errors={streamUrlErrors} />
      </FormGroup>
    </>
  );

  return (
    <>
      <FormGroup className={fgClasses(nameErrors)}>
        <InputLabel>Event Name</InputLabel>
        <Input type="text" value={name} onChange={onNameChange} />
        <InputError errors={nameErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(slugErrors)}>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
        <InputError errors={slugErrors} />
      </FormGroup>

      {isStreamedEventType && renderStreamInput()}

      <FormGroup className={fgClasses(preview_image_url_errors)}>
        <InputLabel>
          {isStreamedEventType ? 'Offline Picture URL' : 'Event Image URL'}
        </InputLabel>
        <Input
          type="text"
          value={preview_image_url}
          onChange={set_preview_image_url}
        />
        <InputError errors={preview_image_url_errors} />
      </FormGroup>

      <FormGroup className={fgClasses(categoryErrors)}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
          className={styles.select}
        />
        <InputError errors={categoryErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(tagsErrors)}>
        <InputLabel>Tags</InputLabel>
        <Tags
          tags={tags}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
        />
        <InputError
          errors={tagsErrors}
          placeholderValues={{
            minLength: ['1', 'tag'],
            hasEmptyMembers: ['tags'],
          }}
        />
      </FormGroup>

      <FormGroup className={fgClasses(dateErrors)}>
        <InputLabel>Date</InputLabel>
        <DateTimePicker
          value={date}
          onChange={date => setDate(date)}
          ampm={false}
        />
        <InputError errors={dateErrors} />
      </FormGroup>

      {!isStreamedEventType && !event && (
        <BetForm
          setBetData={setBetData}
          styles={styles}
          fgClasses={fgClasses}
          setValidity={setIsBetFormValid}
        />
      )}

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

const mapStateToProps = state => {
  return {
    eventSlugs: state.event.events.map(({ slug }) => slug).filter(Boolean),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEventSuccess: () => {
      dispatch(EventActions.createEventSuccess());
    },
    createEventFail: () => {
      dispatch(EventActions.createEventFail());
    },
    editEventSuccess: () => {
      dispatch(EventActions.editEventSuccess());
    },
    editEventFail: () => {
      dispatch(EventActions.editEventFail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEventForm);
